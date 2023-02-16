const accountId = props.accountId ?? "mob.near";
const limitForPosts = props.limitForPosts ?? 5000;

initState({ comments: [] });

const renderItem = (a, post) =>
  a.value.type === "md" && (
    <div key={JSON.stringify(a)}>
      <Widget
        src="mob.near/widget/MainPage.Comment"
        props={{
          accountId: a.accountId,
          blockHeight: a.blockHeight,
          highlight: false,
          raw: false,
        }}
      />
      <div>
        <a
          href={`https://near.social/#/mob.near/widget/MainPage.Post.Page?accountId=${post.accountId}&blockHeight=${post.blockHeight}`}
        >
          Original post
        </a>
      </div>
    </div>
  );

const index = {
  action: "post",
  key: "main",
  options: {
    subscribe: true,
    limit: limitForPosts,
    order: "desc",
  },
};

if (!index) return "";

if (!state.recentPosts) {
  State.update({
    recentPosts: Social.index(index.action, index.key, index.options),
  });
  return "";
}

if (!state.comments.length) {
  const comments = [];
  state.recentPosts.map((post) => {
    const item = {
      type: "social",
      path: `${post.accountId}/post/main`,
      blockHeight: post.blockHeight,
    };

    const index = {
      action: "comment",
      key: item,
      options: {
        limit: 10,
        order: "desc",
      },
    };

    const initialItems = Social.index(index.action, index.key, index.options);
    if (initialItems === null) {
      return "";
    }

    let userComments = initialItems.filter(
      (comment) => comment.accountId === accountId
    );

    userComments
      .filter((comment) => !!comment)
      .map((comment) =>
        comments.push({
          blockHeight: comment.blockHeight,
          object: renderItem(comment, post),
        })
      );
  });

  comments = comments
    .sort((a, b) => b.blockHeight - a.blockHeight)
    .map((comment) => comment.object);

  State.update({ comments });
}

if (!state.comments.length) return "No comments";

return (
  <>
    <h1>Comments by {accountId}</h1>
    {state.comments}
  </>
);
