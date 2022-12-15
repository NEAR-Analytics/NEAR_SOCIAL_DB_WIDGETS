const { questionRef } = props;

if (questionRef) {
  State.init({ questionRef });
} else {
  return (
    <div className="d-flex flex-column gap-3">
      <p>No question ref was passed in props, enter one here:</p>
      <input
        type="text"
        className="form-control"
        value={state.questionRef}
        onChange={(e) => {
          State.update({ questionRef: e.target.value });
        }}
      />
    </div>
  );
}

const question = Social.get(
  `michaelpeter.near/experimental/genie/questions/${questionRef}`
);
return (
  <div className="d-flex flex-column gap-3">
    <p>QuestionRef: {state.questionRef}</p>
    <p>Question: {JSON.stringify(question, null, 4)}</p>
  </div>
);
