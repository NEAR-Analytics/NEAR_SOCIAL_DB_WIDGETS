const currentBlock = Near.block("optimistic");

if (!currentBlock) {
  return "Loading";
}

const currentBlockHeight = currentBlock.header.height;
const minBlockHeight = 21793900;

State.init({
  blockHeight: props.blockHeight
    ? parseInt(props.blockHeight)
    : currentBlockHeight,
});

return (
  <div>
    <Widget
      src="mob.near/widget/Range"
      props={{
        min: minBlockHeight,
        max: currentBlockHeight,
        defaultValue: currentBlockHeight,
        onPointerUp: (blockHeight) => State.update({ blockHeight }),
        title: "Block Height",
      }}
    />

    <div>
      Board #{state.blockHeight}
      <div style={{ height: "70vh" }}>
        <a
          href={`#/mob.near/widget/BerryclubHistory?blockHeight=${state.blockHeight}`}
        >
          <Widget
            src="mob.near/widget/BerryclubBoard"
            props={{ blockHeight: state.blockHeight }}
          />
        </a>
      </div>
    </div>
  </div>
);
