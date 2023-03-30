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

const repostSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24px"
    viewBox="0 0 576 512"
    fill="currentColor"
  >
    <path d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z" />
  </svg>
);

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
        {repostSvg} Reposted by{" "}
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
  item.action === "post" ? renderPost(item) : renderRepost(item);

return (
  <div>
    <Widget
      src="mob.near/widget/MergedIndexFeed"
      props={{ index, renderItem }}
    />
  </div>
);
