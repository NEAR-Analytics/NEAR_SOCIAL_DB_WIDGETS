const LIMIT = 10;

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
  posts(order_by: {block_height: desc}, offset: $offset, limit: ${LIMIT}) {
    account_id
    block_height
    block_timestamp
    content
    comments(order_by: {block_height: asc}, limit: ${LIMIT}, offset: $offset) {
      account_id
      block_height
      block_timestamp
      content
    }
    post_likes {
      account_id
    }
  }
    posts_aggregate {
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
      const posts = result.body.data.posts;
      const postsCount = result.body.data.posts_aggregate.aggregate.count;
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
          content: JSON.parse(item.content),
        }}
      />
    </Post>
  );
};

const onPostsPageChange = (page) => {
  console.log(page, "page selected");
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
        if (result.body.data) {
          const posts = result.body.data.posts;
          const postsCount = result.body.data.posts_aggregate.aggregate.count;
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
      <Subheading> No data to show... </Subheading>
    )}
  </div>
);
