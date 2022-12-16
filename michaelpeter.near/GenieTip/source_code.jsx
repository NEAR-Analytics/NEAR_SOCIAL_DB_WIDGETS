const { answeredBy, questionRef } = props;

if (!answeredBy || !questionRef) {
  return "Missing prop";
}

State.init({ tipAmount: null, showTipForm: false, timestamp: Date.now() });

// const tips = Social.index("genie", `tip2/${answeredBy}`);
// const tipAmount = tips.reduce((acc, v) => acc + parseInt(v.value), 0);
// console.log(tipAmount);
const questionSpecificTips =
  Social.index("genie", `tip2/${questionRef}/${answeredBy}`) || [];
const qTip = questionSpecificTips.reduce(
  (acc, v) => acc + parseInt(v.value.amount),
  0
);
console.log(questionSpecificTip);

const onSubmitClick = () => {
  const gas = 300 * 100000000000;
  const deposit = parseInt(state.tipAmount) + "000000000000000000000000";
  //   const deposit = parseInt(state.tipAmount) + "000000000000000000000";
  Near.call(
    "passthrough.near",
    "transfer",
    { receiver_id: answeredBy },
    gas,
    deposit
  );
};

return (
  <div className="d-flex flex-row gap-4 align-items-center">
    <span>
      <span style={{ fontSize: "1.5rem" }}>⋈ {qTip}</span>
    </span>
    <div>
      <button
        className="btn btn-outline-dark"
        onClick={() => {
          State.update({ showTipForm: true });
        }}
      >
        <i class="bi bi-wallet" />
        Tip
      </button>
    </div>
    {state.showTipForm && (
      <div
        className="d-flex flex-row align-items-center gap-1"
        style={{ paddingLeft: "1rem" }}
      >
        <span>Amount:</span>
        <input
          value={state.tipAmount}
          placeholder="1"
          onChange={(e) => State.update({ tipAmount: e.target.value })}
        />
        <div>
          <CommitButton
            disabled={
              context.loading ||
              !(answeredBy && state.tipAmount) ||
              !parseInt(state.tipAmount)
            }
            data={{
              index: {
                genie: JSON.stringify([
                  {
                    key: `tip2/${answeredBy}`,
                    value: state.tipAmount,
                  },
                  {
                    key: `tip2/${questionRef}/${answeredBy}`,
                    value: {
                      amount: state.tipAmount,
                      timestamp: state.timestamp,
                    },
                  },
                ]),
              },
            }}
            className={`btn ${
              context.loading ? "btn-outline-dark" : "btn-primary"
            }`}
            onClick={() => {
              State.update({ timestamp: Date.now() });
            }}
            onCommit={onSubmitClick}
          >
            Submit
          </CommitButton>
        </div>
      </div>
    )}
  </div>
);
