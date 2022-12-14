function moreDeer() {
  let deer = [];
  for (let i = 0; i < 90; i++) {
    deer.push("https://i.giphy.com/media/Qld1cd6a6QlWw/giphy.webp");
  }
  return deer;
}

State.init({
  deer: moreDeer(),
});

function loadMoreDeer() {
  state.deer = state.deer.concat(moreDeer());
  State.update();
}

return (
  <InfiniteScroll
    pageStart={0}
    loadMore={loadMoreDeer}
    hasMore={true}
    loader={<p>deer...</p>}
  >
    {state.deer.map((url, index) => (
      <img key={index} src={url} />
    ))}
  </InfiniteScroll>
);
