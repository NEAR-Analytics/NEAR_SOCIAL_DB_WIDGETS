let index = [];
const typeWhitelist = [
  "md",
  "efiz.near/type/paragraph",
  "efiz.near/type/Image",
  "efiz.near/type/document",
];
const accountFilter = [props.accountFilter] || undefined;
// const hashtagFilter = ["VNArtistsDAO"];

const key = ""; // this could dictate the version... maybe it's the path? efiz.near/thing/1234

if (hashtagFilter.length) {
  index = hashtagFilter.map((it) => ({
    action: "hashtag",
    key: it.toLowerCase(),
    options: {
      limit: 10,
      order: "desc",
      accountId: accountFilter,
    },
  }));
} else {
  index = {
    action: "post",
    key: "main",
    options: {
      limit: 10,
      order: "desc",
      accountId: accountFilter,
    },
  };
}

const Post = styled.div`
  border-bottom: 1px solid #eceef0;
  padding: 24px 0 12px;

  @media (max-width: 1200px) {
    padding: 12px 0 0;
  }
`;

const renderItem = (a) => {
  let type = a.value.type;

  // return <div>{JSON.stringify(a)}</div>;

  if (typeWhitelist.includes(a.value.type)) {
    return (
      <Post className="post" key={JSON.stringify(a)}>
        <Widget
          src="efiz.near/widget/Every.Post.View"
          props={{
            accountId: a.accountId,
            blockHeight: a.blockHeight,
            type: a.value.type,
          }}
        />
      </Post>
    );
  }
};

return (
  <Widget src="mob.near/widget/MergedIndexFeed" props={{ index, renderItem }} />
);
