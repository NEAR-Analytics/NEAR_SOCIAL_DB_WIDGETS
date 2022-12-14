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
  State.update({
    deer: state.deer.concat(moreDeer()),
  });
}

return (
  <InfiniteScroll
    pageStart={0}
    loadMore={loadMoreDeer}
    hasMore={true}
    loader={<p>deer...</p>}
  >
    {state.deer.map((url, index) => (
      <img src={url} />
    ))}
  </InfiniteScroll>
);
