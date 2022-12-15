const { questionRef } = props;

State.init({ questionRef, refInput });

if (!state.questionRef) {
  return (
    <div className="d-flex flex-column gap-1">
      <p>No question ref was passed in props, enter one here:</p>
      <input
        type="text"
        className="form-control"
        value={state.questionRef}
        onChange={(e) => {
          State.update({ refInput: e.target.value });
        }}
      />
      <button
        onClick={() => {
          State.update({ questionRef: state.refInput });
        }}
      >
        Save
      </button>
    </div>
  );
}

const asker = state.questionRef.split("--")[0];

const question = Social.get(
  `${asker}/experimental/genie/questions/${state.questionRef}`
);

return (
  <div className="d-flex flex-column gap-1">
    <h3>{question}</h3>
    <p>
      Asked by: {asker} | Ref: {state.questionRef}
    </p>
  </div>
);
