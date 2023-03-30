const index = [
  {
    action: "post",
    key: "main",
    options: {
      limit: 10,
      order: "desc",
      accountId: props.accounts,
    },
  },
  {
    action: "repost",
    key: "main",
    options: {
      limit: 10,
      order: "desc",
      accountId: props.accounts,
    },
  },
];

const renderedPosts = {};

const makePostItem = (a) => ({
  type: "social",
  path: `${a.accountId}/post/main`,
  blockHeight: a.blockHeight,
});

const renderPost = (a) => {
  if (a.value.type !== "md") {
    return false;
  }
  const item = JSON.stringify(makePostItem(a));
  if (item in renderedPosts) {
    return false;
  }
  renderedPosts[item] = true;

  return (
    <div key={JSON.stringify(a)} className="mb-3">
      <Widget
        src="mob.near/widget/MainPage.Post"
        props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
      />
    </div>
  );
};

const extractParentPost = (item) => {
  if (!item || item.type !== "social" || !item.path || !item.blockHeight) {
    return undefined;
  }
  const accountId = item.path.split("/")[0];
  return `${accountId}/post/main` === item.path
    ? { accountId, blockHeight: item.blockHeight }
    : undefined;
};

const renderRepost = (a) => {
  if (a.value.type !== "repost") {
    return false;
  }
  const post = extractParentPost(a.value.item);
  if (!post) {
    return false;
  }
  const item = JSON.stringify(post);
  if (item in renderedPosts) {
    return false;
  }
  renderedPosts[item] = true;

  return (
    <div key={JSON.stringify(a)} className="mb-3">
      <div className="text-muted">
        Reposted by{" "}
        <Widget
          src="mob.near/widget/ProfileLine"
          props={{
            accountId: a.accountId,
            hideImage: true,
            hideAccountId: true,
            tooltip: true,
          }}
        />
      </div>
      <Widget
        src="mob.near/widget/MainPage.Post"
        props={{ accountId: post.accountId, blockHeight: post.blockHeight }}
      />
    </div>
  );
};

const renderItem = (item) =>
  item.key === "post" ? renderPost(item) : renderRepost(item);

return (
  <div>
    <Widget
      src="mob.near/widget/MergedIndexFeed"
      props={{ index, renderItem }}
    />
  </div>
);
