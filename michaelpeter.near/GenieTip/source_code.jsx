const { answeredBy, questionRef } = props;

if (!answeredBy || !questionRef) {
  return "Missing prop";
}

State.init({ tipAmount: null });

const tips = Social.index("genie", `tip/${answeredBy}`);
const tipAmount = tips.reduce((acc, v) => acc + parseInt(v.value), 0);
// console.log(tipAmount);
const questionSpecificTips = Social.index(
  "genie",
  `tip/${questionRef}/${answeredBy}`
);
const qTip = questionSpecificTips.reduce(
  (acc, v) => acc + parseInt(v.value),
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

const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
`;

const ToolTipText = styled.span`
  visibility: visible;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;

  ${Tooltip}:hover & {
    visibility: visible;
  }
`;
return (
  <div className="d-flex flex-row gap-2 align-items-center">
    <span>
      <i class="bi bi-infinity" />
      {qTip}
    </span>
    <Tooltip>
      Hover over me
      <ToolTipText>Tooltip text</ToolTipText>
    </Tooltip>
    <div>
      <button className="btn btn-outline-dark">
        <i class="bi bi-wallet" />
        Tip
      </button>
    </div>
    <div>
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
        className={`btn ${
          context.loading ? "btn-outline-dark" : "btn-primary"
        }`}
        onCommit={onSubmitClick}
      >
        Submit
      </CommitButton>
    </div>
  </div>
);
