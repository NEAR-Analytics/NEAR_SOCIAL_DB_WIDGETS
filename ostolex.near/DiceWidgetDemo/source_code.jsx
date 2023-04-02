State.init({
  diceSumString: null,
  diceRolling: false,
  diceCount: 2,
  dotsColor: "black",
  mainColor: "white",
  borderColor: "black",
});

const diceCallback = (diceResults) => {
  const diceSumString =
    diceResults.join(" + ") +
    " = " +
    diceResults.reduce((partialSum, a) => partialSum + a, 0);
  State.update({ diceRolling: false, diceSumString });
};

return (
  <>
    <label>Dice count:</label>
    <input
      value={state.diceCount}
      onChange={(e) => State.update({ diceCount: e.target.value })}
    />
    <label>Border color:</label>
    <input
      value={state.borderColor}
      onChange={(e) => State.update({ borderColor: e.target.value })}
    />
    <label>Dots color:</label>
    <input
      value={state.dotsColor}
      onChange={(e) => State.update({ dotsColor: e.target.value })}
    />
    <label>Main color:</label>
    <input
      value={state.mainColor}
      onChange={(e) => State.update({ mainColor: e.target.value })}
    />
    {state.diceSumString ? (
      <h1>{state.diceSumString}</h1>
    ) : (
      <h1>Roll the Dice!</h1>
    )}

    {state.diceRolling ? (
      <Widget
        src="ostolex.near/widget/DiceWidget"
        props={{
          callback: diceCallback,
          borderColor: state.borderColor,
          dotsColor: state.dotsColor,
          mainColor: state.mainColor,
          diceCount: state.diceCount,
        }}
      />
    ) : (
      <button onClick={() => State.update({ diceRolling: true })}>
        Roll Dice!
      </button>
    )}
  </>
);
