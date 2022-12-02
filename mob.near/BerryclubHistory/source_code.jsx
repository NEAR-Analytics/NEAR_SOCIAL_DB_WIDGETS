const currentBlock = Near.block("optimistic");

if (!currentBlock) {
  return "Loading";
}

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
        defaultValue: state.blockHeight,
        onPointerUp: (blockHeight) => State.update({ blockHeight }),
        title: "Block Height",
      }}
    />

    <div>
      <div className="mb-2">
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
      </div>
      <div className="mb-2" style={{ height: "70vh" }}>
        <a
          href={`#/mob.near/widget/BerryclubBoard?blockHeight=${state.blockHeight}`}
          target="_blank"
        >
          <Widget
            src="mob.near/widget/BerryclubBoard"
            props={{ blockHeight: state.blockHeight }}
          />
        </a>
      </div>
      <hr />
      <div>
        <Widget src="mob.near/widget/BerryclubFeed" />
      </div>
    </div>
  </div>
);
