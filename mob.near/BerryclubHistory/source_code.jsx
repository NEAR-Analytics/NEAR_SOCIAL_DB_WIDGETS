const currentBlock = Near.block("final");

if (!currentBlock) {
  return "Loading";
}

const finetune = [-10000, -1000, -100, -10, -1, 1, 10, 100, 1000, 10000];

const currentBlockHeight = currentBlock.header.height;
const minBlockHeight = 21793900;

const numBlocks = currentBlockHeight - minBlockHeight;
const randomBlockHeight = () =>
  minBlockHeight + Math.floor(Math.random() * numBlocks);

State.init({
  blockHeight: randomBlockHeight(),
});

return (
  <div>
    <Widget
      src="mob.near/widget/Range"
      props={{
        min: minBlockHeight,
        max: currentBlockHeight,
        value: state.blockHeight,
        onPointerUp: (blockHeight) => State.update({ blockHeight }),
        title: "Block Height",
      }}
    />
    <div className="mb-2 d-flex gap-2 flex-wrap">
      <CommitButton
        className="btn btn-primary"
        data={{
          index: {
            post: JSON.stringify({
              key: "berryclub",
              value: state.blockHeight,
            }),
          },
        }}
      >
        Share Board #{state.blockHeight}
      </CommitButton>
      <button
        className="btn btn-secondary"
        onClick={() => {
          State.update({
            blockHeight: randomBlockHeight(),
          });
        }}
      >
        Random Board
      </button>
      <div className="btn-group" role="group" aria-label="finetuning">
        {finetune.map((value) => (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              State.update({
                blockHeight: Math.min(
                  currentBlockHeight,
                  Math.max(minBlockHeight, parseInt(state.blockHeight + value))
                ),
              });
            }}
          >
            {value > 0 ? `+${value}` : value}
          </button>
        ))}
      </div>
    </div>
    <div style={{ height: "min(50vh, 95vw)" }}>
      <Widget
        src="mob.near/widget/BerryclubBoard"
        props={{ blockHeight: state.blockHeight }}
      />
    </div>
    <hr />
    <div>
      <Widget src="mob.near/widget/BerryclubFeed" />
    </div>
  </div>
);
