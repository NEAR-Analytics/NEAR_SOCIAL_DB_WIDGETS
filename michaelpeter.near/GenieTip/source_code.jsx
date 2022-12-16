const { answeredBy, questionRef } = props;

if (!answeredBy || !questionRef) {
  return "Missing prop";
}

State.init({ tipAmount: null });

const tips = Social.index("genie", `tip/${answeredBy}`);
const tipAmount = tips.reduce((acc, v) => acc + parseInt(v.value), 0);
// console.log(tipAmount);
const questionSpecificTip = Social.index(
  "genie",
  `tip/${questionRef}/${answeredBy}`
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
  <div class="mb-4">
    <h1> Giving a Tip </h1>
    <p>
      Receiver:{" "}
      <input
        value={answeredBy}
        placeholder="bowen.near"
        onChange={(e) => State.update({ receiverID: e.target.value })}
      />
    </p>
    <p>
      Amount:{" "}
      <input
        value={state.tipAmount}
        placeholder="1"
        onChange={(e) => State.update({ tipAmount: e.target.value })}
      />
    </p>
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
              key: `tip/${answeredBy}`,
              value: state.tipAmount,
            },
            {
              key: `tip/${questionRef}/${answeredBy}`,
              value: state.tipAmount,
            },
          ]),
        },
      }}
      className={`btn ${context.loading ? "btn-outline-dark" : "btn-primary"}`}
      onCommit={onSubmitClick}
    >
      Submit
    </CommitButton>
  </div>
);
