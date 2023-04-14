let questionNumber = props.qn ?? -1;
console.log(props.qn);
State.init({
  questionNumber,
  somethingOnTop: false,
});

const questions = ["Question 1", "Question 2"];

function renderWidget() {
  State.update({ somethingOnTop: true });
}

function renderWithoutSomethingOnTop() {
  return (
    <>
      <p>{state.questionNumber}</p>
      <button onClick={() => State.update({ questionNumber: 0 })}>
        Show 1
      </button>
      <button onClick={() => State.update({ questionNumber: 1 })}>
        Show 2
      </button>
      {state.questionNumber != -1 && (
        <div>
          <p>{questions[state.questionNumber]}</p>
          <button onClick={renderWidget}>View all</button>
        </div>
      )}
    </>
  );
}

function renderWithSomethingOnTop(widgetSrc) {
  return <Widget src={widgetSrc} props={{ qn: 1 - state.questionNumber }} />;
}

return (
  <>
    {state.somethingOnTop
      ? renderWithSomethingOnTop("silkking.near/widget/test2")
      : renderWithoutSomethingOnTop()}
  </>
);
