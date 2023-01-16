const accountId = props.accountId || context.accountId;

if (!accountId) return "login or send accountId in props";

const widgetsHistoryChangesBlocks = Social.keys(
  `${accountId}/widget/*`,
  "final",
  {
    return_type: "History",
  }
);

if (widgetsHistoryChangesBlocks === null) return "Loading...";

State.init({
  widgetsHistoryChangesBlocks: Object.keys(
    widgetsHistoryChangesBlocks[accountId]["widget"]
  )
    .map((key) => {
      return {
        name: key,
        blocks: widgetsHistoryChangesBlocks[accountId]["widget"][key],
      };
    })
    .sort(
      (a, b) => b.blocks[b.blocks.length - 1] - a.blocks[a.blocks.length - 1]
    ),
});

console.log(state.widgetsHistoryChangesBlocks);

return (
  <div>
    <div div class="card mb-3">
      <Widget
        src="mob.near/widget/Profile.ShortInlineBlock"
        props={{ accountId }}
      />
    </div>
    <div div class="card mb-3">
      <h3 class="card-header">Widgets</h3>

      <div class="list-group">
        {state.widgetsHistoryChangesBlocks.map((element) => (
          <div>
            <button
              className={`d-flex flex-row list-group-item list-group-item-action`}
              onClick={() => {
                State.update({ selectedBlockHeight: blockHeight });
              }}
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
