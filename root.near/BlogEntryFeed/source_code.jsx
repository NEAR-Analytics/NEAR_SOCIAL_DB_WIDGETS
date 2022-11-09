const accountId = props.accountId ?? "*";

const data = Social.keys(`${accountId}/post/entry`, "final", {
  return_type: "History",
});

if (!data) {
  return "";
}

const processData = (data) => {
  const accounts = Object.entries(data);

  const allEntries = accounts
    .map((account) => {
      const accountId = account[0];
      const blockHeights = account[1].post.entry;
      return blockHeights.map((blockHeight) => ({
        accountId,
        blockHeight,
      }));
    })
    .flat();

  allEntries.sort((a, b) => b.blockHeight - a.blockHeight);
  return allEntries;
};

const entryToWidget = (a) => (
  <div key={JSON.stringify(a)} style={{ minHeight: "200px" }}>
    <a
      className="text-decoration-none"
      href={`#/root.near/widget/BlogEntry?accountId=${a.accountId}&blockHeight=${a.blockHeight}`}
    >
      <Widget src="root.near/widget/BlogEntry" props={a} />
    </a>
  </div>
);

State.init({
  allEntries: processData(data),
  widgets: [],
});

const makeMoreEntries = () => {
  const newEntries = state.allEntries
    .slice(state.widgets.length, state.widgets.length + 10)
    .map(entryToWidget);
  newEntries.forEach((entry) => state.widgets.push(entry));
  State.update();
};

return (
  <div
    className="px-2 mx-auto"
    style={{ background: "#fff", maxWidth: "42em" }}
  >
    {context.accountId ? (
      <a href="https://near.social/#/root.near/widget/AddBlogEntry">
        Post new blog entry
      </a>
    ) : (
      ""
    )}
    <InfiniteScroll
      pageStart={0}
      loadMore={makeMoreEntries}
      hasMore={state.widgets.length < state.allEntries.length}
      loader={<div className="loader">Loading ...</div>}
    >
      {state.widgets}
    </InfiniteScroll>
  </div>
);
