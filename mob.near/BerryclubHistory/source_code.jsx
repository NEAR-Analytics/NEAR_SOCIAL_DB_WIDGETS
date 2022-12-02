const currentBlock = Near.block("optimistic");

if (!currentBlock) {
  return "Loading";
}

const currentBlockHeight = currentBlock.header.height;

const minBlockHeight = 21793900;

State.init({
  blockHeight: currentBlockHeight,
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
      <div>
        <Widget
          src="mob.near/widget/BerryclubBoard"
          props={{ blockHeight: state.blockHeight }}
        />
      </div>
    </div>
  </div>
);
