const initWidgetPath = "devgovgigs.near/widget/Ideas";

State.init({
  widgetPath: initWidgetPath,
});

const historyBlocksRequest = Social.keys(`${state.widgetPath}`, "final", {
  return_type: "History",
});

if (historyBlocksRequest === null) return "loading...";

const [widgetAccountId, _, widgetName] = state.widgetPath.split("/");

let blocksChanges =
  historyBlocksRequest[widgetAccountId]?.["widget"]?.[widgetName];

if (blocksChanges) blocksChanges = blocksChanges?.sort((a, b) => b - a);

if (!state.selectedBlockHeight) state.selectedBlockHeight = blocksChanges[0];

function getDatastringFromBlockHeight(blockHeight) {
  const block = Near.block(blockHeight);
  const date = new Date(block.header.timestamp_nanosec / 1e6);
  return date.toDateString() + " " + date.toLocaleTimeString();
}

const renderBlockChangesLink = (blockHeight) => {
  return (
    <div>
      <button
        className={`list-group-item list-group-item-action ${
          state.selectedBlockHeight != blockHeight ? "" : "list-group-item-info"
        }`}
        onClick={() => {
          State.update({ selectedBlockHeight: blockHeight });
        }}
      >
        #{blockHeight} * {getDatastringFromBlockHeight(blockHeight)}
      </button>
    </div>
  );
};

function blockHeightToWidget(blockHeight) {
  const index = blocksChanges.findIndex((el) => el == blockHeight);
  console.log({
    currentBlockHeight: blockHeight,
    prevBlockHeight: blocksChanges[index + 1],
  });
  return (
    <Widget
      style={{ minHeight: "200px" }}
      key={blockHeight}
      src={`bozon.near/widget/WidgetHistory.CodeHistoryCard`}
      props={{
        pathToWidget: state.widgetPath,
        currentBlockHeight: blockHeight,
        prevBlockHeight: blocksChanges[index + 1],
      }}
    />
  );
}

return (
  <div>
    <h1 class="text-center">Widget History</h1>

    <div class="input-group mb-3">
      <input
        class="form-control"
        placeholder={initWidgetPath}
        defaultValue={state.widgetPath || initWidgetPath}
        onBlur={(e) => {
          State.update({
            widgetPath: e.target.value,
          });
        }}
      />
    </div>

    {!blocksChanges ? (
      <div>incorrent widget path</div>
    ) : (
      <div>
        <div div class="card mb-3">
          <h3 class="card-header">{blocksChanges.length} Commits</h3>

          <div class="list-group">
            {blocksChanges
              .slice(0, 5)
              .map((height) => renderBlockChangesLink(height))}

            <div class="collapse" id="collapseExample">
              {blocksChanges
                .slice(5)
                .map((height) => renderBlockChangesLink(height))}
            </div>

            <button
              class="list-group-item active"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Show all
            </button>
          </div>
        </div>

        <div>{blockHeightToWidget(state.selectedBlockHeight)}</div>
      </div>
    )}
  </div>
);
