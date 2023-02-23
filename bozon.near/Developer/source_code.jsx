const accountId = props.accountId || context.accountId;

if (!accountId) return "login or send accountId in props";

const allWidgetsHistoryChangesBlocks = Social.keys(
  `${accountId}/widget/*`,
  "final",
  {
    return_type: "History",
  }
);

if (allWidgetsHistoryChangesBlocks === null) return "Loading...";

const notDeleted = Social.keys(`${accountId}/widget/*`, "final", {
  values_only: true,
});

if (notDeleted === null) return "Loading...";

const countAllWidgets = Object.keys(
  allWidgetsHistoryChangesBlocks[accountId]["widget"] || {}
).length;

const countNotDeleted = Object.keys(
  notDeleted[accountId]["widget"] || {}
).length;

const countDeletedWidgets = countAllWidgets - countNotDeleted;
const countCommits = Object.values(
  allWidgetsHistoryChangesBlocks[accountId]["widget"] || {}
).reduce((cur, prev) => cur + prev.length, 0);

const allWidgetsHistoryChangesBlocksComputedAdjusted = Object.keys(
  allWidgetsHistoryChangesBlocks[accountId]["widget"] || {}
)
  .map((key) => {
    return {
      name: key,
      blocks: allWidgetsHistoryChangesBlocks[accountId]["widget"][key],
    };
  })
  .sort(
    (a, b) => b.blocks[b.blocks.length - 1] - a.blocks[a.blocks.length - 1]
  );

return (
  <div>
    <div div class="card mb-3 p-2">
      <Widget
        src="mob.near/widget/Profile.ShortInlineBlock"
        props={{ accountId }}
      />
    </div>
    <div div class="card mb-3 p-2">
      <div>widgets: {countNotDeleted}</div>
      <div>deleted widgets: {countDeletedWidgets}</div>
      <div>commits: {countCommits}</div>
    </div>
    <div div class="card mb-3">
      <h3 class="card-header">Widgets</h3>

      <div class="list-group">
        {allWidgetsHistoryChangesBlocksComputedAdjusted.map((element) => (
          <div>
            <button
              onClick={() => {
                State.update({ selectedBlockHeight: blockHeight });
              }}
              className={`d-flex flex-row list-group-item list-group-item-action ${
                notDeleted[accountId]["widget"][element.name]
                  ? ""
                  : "list-group-item-warning"
              }`}
            >
              <div>{element.name}</div>

              <OverlayTrigger
                placement="auto"
                overlay={<Tooltip>count commits</Tooltip>}
              >
                <span class="badge text-bg-success p-2 me-1 align-self-center">
                  {element.blocks.length}
                </span>
              </OverlayTrigger>

              <OverlayTrigger
                placement="auto"
                overlay={<Tooltip>last update</Tooltip>}
              >
                <span class="badge text-bg-success p-2 me-1 align-self-center">
                  {
                    <Widget
                      src={`mob.near/widget/TimeAgo`}
                      props={{
                        blockHeight: element.blocks[element.blocks.length - 1],
                      }}
                    />
                  }
                </span>
              </OverlayTrigger>
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);
