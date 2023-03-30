const limitForPosts = props.limitForPosts ?? 5000;
initState({ postsByReposts: [] });

const index = {
  action: "repost",
  key: "main",
  options: {
    subscribe: false,
    limit: limitForPosts,
    order: "desc",
  },
};

if (!state.reposts) {
  State.update({
    reposts: Social.index(index.action, index.key, index.options),
  });
  return "";
}

let postsByReposts = [];
state.reposts.map((repost) => {
  const key = JSON.stringify(repost.value.item);
  postsByReposts[key] = (postsByReposts[key] ?? 0) + 1;
});

const sortedPosts = Object.keys(postsByReposts).sort(
  (a, b) => postsByReposts[b] - postsByReposts[a]
);

const topPosts = sortedPosts.map((postStringified) => {
  const post = JSON.parse(postStringified);
  return (
    <div style={{ paddingBottom: "10px" }}>
      <Widget
        src="zavodil.near/widget/MainPage.Post"
        props={{
          accountId: post.path.replace("/post/main", ""),
          blockHeight: post.blockHeight,
          repostsNum: postsByReposts[postStringified],
        }}
      />
    </div>
  );
});

State.update({ topPosts });

return (
  <>
    <h1>Top posts by reposts</h1>
    {state.topPosts}
  </>
);
