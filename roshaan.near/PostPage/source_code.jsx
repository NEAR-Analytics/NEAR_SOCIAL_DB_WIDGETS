const accountId = props.accountId;
const commentBlockHeight = parseInt(props.commentBlockHeight);
let parentPost = null;

State.init({
  parentPostLoaded: false,
  originalAuthorAccountId: undefined,
  originalAuthorBlockHeight: undefined,
  originalPostContent: undefined,
});

const parentPostByComment = `query ParentPostByComment {
  roshaan_near_alphaindexer_comments(
    where: {_and: {account_id: {_eq: "${accountId}"}, block_height: {_eq: ${commentBlockHeight}}}}
  ) {
    post {
      account_id
      accounts_liked
      block_height
      block_timestamp
      content
      id
      receipt_id
      comments {
        account_id
        block_height
        block_timestamp
        content
        receipt_id
        id
      }
      post_likes {
        account_id
        block_height
        block_timestamp
        receipt_id
      }
    }
    receipt_id
    id
  }
}`;

function fetchGraphQL(operationsDoc, operationName, variables) {
  return asyncFetch(
    "https://query-api-hasura-vcqilefdcq-uc.a.run.app/v1/graphql",
    {
      method: "POST",
      headers: { "x-hasura-role": "roshaan_near" },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    }
  );
}

const extractParentPost = (item) => {
  if (!item || item.type !== "social" || !item.path || !item.blockHeight) {
    return undefined;
  }

  const accountId = item.path.split("/")[0];
  return `${accountId}/post/main` === item.path
    ? { accountId, blockHeight: item.blockHeight }
    : undefined;
};

if (commentBlockHeight && accountId) {
  fetchGraphQL(parentPostByComment, "ParentPostByComment", {}).then(
    (result) => {
      if (result.status === 200) {
        if (result.body.data) {
          const posts = result.body.data.roshaan_near_alphaindexer_comments;
          if (posts.length > 0) {
            const post = posts[0].post;
            let content = JSON.parse(post.content);
            const comments = post.comments;
            State.update({
              parentPostLoaded: true,
              originalAuthorAccountId: post.account_id,
              originalAuthorBlockHeight: post.block_height,
              originalPostContent: content,
              comments: comments,
            });
          }
        }
      }
    }
  );
} else {
  return "Must pass in an accountId and blockHeight when comment was posted.";
}

if (state.parentPostLoaded) {
  return (
    <Widget
      src="roshaan.near/widget/Posts.Post"
      props={{
        accountId: state.originalAuthorAccountId,
        blockHeight: state.originalAuthorBlockHeight,
        content: state.originalPostContent,
        highlightComment: { accountId, blockHeight: commentBlockHeight },
        comments: state.comments,
      }}
    />
  );
} else {
  return "Loading";
}
