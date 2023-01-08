const initWidgetPath = "devgovgigs.near/widget/Ideas";

State.init({
  widgetPath: initWidgetPath,
  widgetsCodeChanges: [],
});

const historyBlocksRequest = Social.keys(`${state.widgetPath}`, "final", {
  return_type: "History",
});

if (historyBlocksRequest === null) return "loading...";

const [widgetAccountId, _, widgetName] = state.widgetPath.split("/");

let blocksChanges =
  historyBlocksRequest[widgetAccountId]?.["widget"]?.[widgetName];

if (blocksChanges) blocksChanges = blocksChanges?.sort((a, b) => b - a);

const loadMoreCode = () => {
  const newCode = blocksChanges
    .slice(state.widgetsCodeChanges.length, state.widgetsCodeChanges.length + 1)
    .map(blockHeightToWidget);

  newCode.forEach((code) => state.widgetsCodeChanges.push(code));
  State.update({});
};

const blockHeightToWidget = (blockHeight) => {
  const index = blocksChanges.findIndex((el) => el == blockHeight);
  console.log({
    currentBlockHeight: blockHeight,
    prevBlockHeight: blocksChanges[index + 1],
  });
  return (
    <div style={{ minHeight: "200px" }} key={blockHeight}>
      <hr />
      <div>changes in block #{blockHeight}</div>
      <Widget src={`mob.near/widget/TimeAgo`} props={{ blockHeight }} />
      <Widget
        src={`bozon.near/widget/WidgetHistory.CodeHistory`}
        props={{
          pathToWidget: state.widgetPath,
          currentBlockHeight: blockHeight,
          prevBlockHeight: blocksChanges[index + 1],
        }}
      />
    </div>
  );
};

return (
  <div>
    <h1 class="text-center">Widget History</h1>

    <div class="input-group mb-3">
      <input
        class="form-control"
        placeholder={initWidgetPath}
        defaultValue={initWidgetPath}
        onBlur={(e) => {
          State.update({ widgetPath: e.target.value, widgetsCodeChanges: [] });
        }}
      />
    </div>

    {!blocksChanges ? (
      <div>incorrent widget path</div>
    ) : (
      <div>
        <div>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMoreCode}
            hasMore={blocksChanges.length > state.widgetsCodeChanges.length}
            loader={<div className="loader">Loading...</div>}
          >
            {state.widgetsCodeChanges}
          </InfiniteScroll>
        </div>
      </div>
    )}
  </div>
);
