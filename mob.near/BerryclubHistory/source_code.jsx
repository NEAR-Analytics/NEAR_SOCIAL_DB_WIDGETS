const currentBlock = Near.block("final");

if (!currentBlock) {
  return "Loading";
}

const Contract = {
  Berryclub: "berryclub.ek.near",
  Dacha: "v1.dacha-finance.near",
};

const finetunes = [
  [-10000, -1000, -100, -10, -1],
  [1, 10, 100, 1000, 10000],
];

const currentBlockHeight = currentBlock.header.height;
const minBlockHeight = state.contract === Contract.Dacha ? 54570186 : 21793900;

const intoRange = (blockHeight) =>
  Math.min(currentBlockHeight, Math.max(minBlockHeight, parseInt(blockHeight)));

const numBlocks = currentBlockHeight - minBlockHeight;
const randomBlockHeight = () =>
  minBlockHeight + Math.floor(Math.random() * numBlocks);

State.init({
  contract: Contract.Berryclub,
  blockHeight: props.blockHeight
    ? parseInt(props.blockHeight)
    : randomBlockHeight(),
});

return (
  <div>
    <div className="btn-group" role="group" aria-label="Contract selector">
      <input
        type="radio"
        className="btn-check"
        name="contract-radio"
        id="contract-berryclub"
        autoComplete="off"
        checked={state.contract === Contract.Berryclub}
        onChange={() => State.update({ contract: Contract.Berryclub })}
        value={Contract.Berryclub}
        title={"Set contract to Berryclub"}
      />
      <label
        className="btn btn-outline-success fs-2"
        htmlFor="contract-berryclub"
      >
        🥑
      </label>

      <input
        type="radio"
        className="btn-check"
        name="contract-radio"
        id="contract-dacha"
        autoComplete="off"
        checked={state.contract === Contract.Dacha}
        onChange={() => State.update({ contract: Contract.Dacha })}
        value={Contract.Dacha}
        title={"Set contract to Dacha Finance"}
      />
      <label className="btn btn-outline-success fs-2" htmlFor="contract-dacha">
        🥔
      </label>
    </div>
    <Widget
      src="mob.near/widget/Range"
      props={{
        min: minBlockHeight,
        max: currentBlockHeight,
        value: intoRange(state.blockHeight),
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
              value: {
                blockHeight: state.blockHeight,
                contract: state.contract,
              },
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
      {finetunes.map((finetune) => (
        <div className="btn-group" role="group" aria-label="finetuning">
          {finetune.map((value) => (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                State.update({
                  blockHeight: intoRange(parseInt(state.blockHeight) + value),
                });
              }}
            >
              {value > 0 ? `+${value}` : value}
            </button>
          ))}
        </div>
      ))}
    </div>
    <div style={{ height: "min(50vh, 95vw)" }}>
      <Widget
        src="mob.near/widget/BerryclubBoard"
        props={{ blockHeight: state.blockHeight, contract: state.contract }}
      />
    </div>
    <hr />
    <div>
      <Widget src="mob.near/widget/BerryclubFeed" />
    </div>
  </div>
);
