const LIMIT = 10;
const option = props.postsOrderOption ?? "blockHeight";

State.init({
  posts: [],
  postsCount: 0,
  postsPage: 0,
});

const Subheading = styled.h2`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 10px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;
`;

const postsQuery = `
  query IndexerQuery($offset: Int) {
  roshaan_near_feed_indexer_posts(order_by: {${
    option === "recentComments"
      ? `block_height: desc`
      : `last_comment_timestamp: desc`
  }}, offset: $offset, limit: ${LIMIT}) {
    account_id
    block_height
    block_timestamp
    content
    receipt_id
    accounts_liked
    last_comment_timestamp
    comments(order_by: {block_height: asc}) {
      account_id
      block_height
      block_timestamp
      content
    }
  }
  roshaan_near_alphaindexer_posts_aggregate {
    aggregate {
      count
    }
  }
}
`;

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

fetchGraphQL(postsQuery, "IndexerQuery", {
  offset: state.postsPage * LIMIT,
}).then((result) => {
  if (result.status === 200) {
    if (result.body.data) {
      const posts = result.body.data.roshaan_near_alphaindexer_posts;
      const postsCount =
        result.body.data.roshaan_near_alphaindexer_posts_aggregate.aggregate
          .count;
      if (posts.length > 0) {
        State.update({
          posts,
          postsCount,
        });
      }
    }
  }
});

const Post = styled.div`
  border-bottom: 1px solid #ECEEF0;
  padding: 24px 0 12px;

  @media (max-width: 1200px) {
    padding: 12px 0 0;
  }
`;

const renderItem = (item, i) => {
  return (
    <Post className="post" key={item.block_height + "_" + item.account_id}>
      <Widget
        src="roshaan.near/widget/Posts.Post"
        props={{
          accountId: item.account_id,
          blockHeight: item.block_height,
          content: item.content,
          comments: item.comments,
          likes: item.accounts_liked,
        }}
      />
    </Post>
  );
};

const onPostsPageChange = (page) => {
  page = page - 1;
  if (page === state.postsPage) {
    console.log(`Selected the same page number as before: ${pageNumber}`);
    return;
  }

  try {
    fetchGraphQL(postsQuery, "IndexerQuery", {
      offset: state.postsPage * LIMIT,
    }).then((result) => {
      if (result.status === 200) {
        let data = result.body.data;
        if (data) {
          const posts = data.roshaan_near_alphaindexer_posts;
          const postsCount =
            data.roshaan_near_alphaindexer_posts_aggregate.aggregate.count;
          if (posts.length > 0) {
            State.update({
              posts: posts,
              postsCount: postsCount,
            });
          }
        }
      }
    });
  } catch (e) {
    console.log("error:", e);
  }
  State.update({ postsPage: page, currentPage: page });
};

const renderedItems = state.posts.map(renderItem);
return (
  <div>
    {state.posts.length > 0 ? (
      <>
        {renderedItems}
        <Widget
          src="roshaan.near/widget/Paginate-fork"
          props={{
            siblingCount: 1,
            totalCount: state.postsCount,
            pageSize: LIMIT,
            onPageChange: onPostsPageChange,
            currentPage: state.postsPage,
          }}
        />
      </>
    ) : (
      <Subheading> Loading... </Subheading>
    )}
  </div>
);
