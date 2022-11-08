const accountId = props.accountId ?? "*";

const data = Social.keys(`${accountId}/post/meme`, "final", {
  return_type: "History",
});

if (!data) {
  return "Loading";
}

const processData = (data) => {
  const accounts = Object.entries(data);

  const allMemes = accounts
    .map((account) => {
      const accountId = account[0];
      const blockHeights = account[1].post.meme;
      return blockHeights.map((blockHeight) => ({
        accountId,
        blockHeight,
      }));
    })
    .flat();

  allMemes.sort((a, b) => b.blockHeight - a.blockHeight);
  return allMemes;
};

const memeToWidget = (a) => (
  <div key={JSON.stringify(a)} style={{ minHeight: "200px" }}>
    <a
      className="text-decoration-none"
      href={`#/mob.near/widget/Meme?accountId=${a.accountId}&blockHeight=${a.blockHeight}`}
    >
      <Widget src="mob.near/widget/Meme" props={a} />
    </a>
  </div>
);

State.init({
  widgets: [],
});

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allMemes: processData(data),
  });
}

const makeMoreMemes = () => {
  const newMemes = state.allMemes
    .slice(state.widgets.length, state.widgets.length + 10)
    .map(memeToWidget);
  newMemes.forEach((meme) => state.widgets.push(meme));
  State.update();
};

return (
  <div
    className="px-2 mx-auto"
    style={{ background: "#fff", maxWidth: "42em" }}
  >
    {context.accountId && (
      <Widget src="mob.near/widget/AddMeme" props={{ noPrevMeme: true }} />
    )}
    <InfiniteScroll
      pageStart={0}
      loadMore={makeMoreMemes}
      hasMore={state.widgets.length < state.allMemes.length}
      loader={<div className="loader">Loading ...</div>}
    >
      {state.widgets}
    </InfiniteScroll>
  </div>
);
