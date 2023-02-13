const accountId = props.accountId || context.accountId;

if (!accountId) return "login or send accountId in props";

const allWidgetsHistoryChangesBlocks = Social.keys(
  `${accountId}/widget/*`,
  "final",
  {
    return_type: "History",
  }
);

const notDeleted = Social.keys(`${accountId}/widget/*`, "final", {
  values_only: true,
});

if (allWidgetsHistoryChangesBlocks === null) return "Loading...";

State.init({
  allWidgetsHistoryChangesBlocks: Object.keys(
    allWidgetsHistoryChangesBlocks[accountId]["widget"]
  )
    .map((key) => {
      return {
        name: key,
        blocks: allWidgetsHistoryChangesBlocks[accountId]["widget"][key],
      };
    })
    .sort(
      (a, b) => b.blocks[b.blocks.length - 1] - a.blocks[a.blocks.length - 1]
    ),
});

console.log(notDeleted[accountId]["widget"]);

return (
  <div>
    <div div class="card mb-3">
      <Widget
        src="mob.near/widget/Profile.ShortInlineBlock"
        props={{ accountId }}
      />
    </div>
    <div div class="card mb-3">
      Stats:
      {}
    </div>
    <div div class="card mb-3">
      <h3 class="card-header">Widgets</h3>

      <div class="list-group">
        {state.allWidgetsHistoryChangesBlocks.map((element) => (
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
              <span class="badge text-bg-success p-2 me-1 align-self-center">
                {element.blocks.length}
              </span>
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
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);
