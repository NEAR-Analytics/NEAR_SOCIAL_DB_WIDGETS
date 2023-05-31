let index = [];
const typeWhitelist = JSON.parse(props.typeWhitelist || "null") || [
  "efiz.near/type/paragraph",
  "efiz.near/type/Image",
  "efiz.near/type/document",
];
const accountFilter =
  (props.accountFilter && [props.accountFilter]) || undefined;
const hashtagFilter = JSON.parse(props.hashtagFilter || "null") || [];
const domainFilter = JSON.parse(props.domainFilter || "null") || ["post"];
const key = props.key || "main";

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
  index = domainFilter.map((it) => ({
    action: it,
    key, // what should this be used for...
    options: {
      limit: 10,
      order: "desc",
      accountId: accountFilter,
    },
  }));
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
  // return <p>{JSON.stringify(a)}</p>;

  // PATH NORMALIZATION
  const path = a.value.path;
  const domain = "post";
  if (path === undefined) {
    // we need to construct paths from hashtags
    domain = a.action;
    path = `${a.accountId}/post/${a.key}`;
  } else {
    // different domains still save to post... that's probably dumb
    const parts = path.split("/");
    if (parts[1] !== "thing") {
      domain = parts[1];
      parts[1] = "post";
      path = parts.join("/");
    }
  }
  if (typeWhitelist.includes(type) && domainFilter.includes(domain)) {
    return (
      <Post className="post" key={JSON.stringify(a)}>
        <Widget
          src="efiz.near/widget/Every.Post.View"
          props={{
            path,
            blockHeight: a.blockHeight,
          }}
        />
      </Post>
    );
  }
};

return (
  <Widget src="mob.near/widget/MergedIndexFeed" props={{ index, renderItem }} />
);
