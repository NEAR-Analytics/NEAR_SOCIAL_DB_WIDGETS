const { questionRef } = props;

State.init({ questionRef, refInput });

if (!state.questionRef) {
  return (
    <div className="d-flex flex-column gap-1">
      <p>No question ref was passed in props, enter one here:</p>
      <div className="d-flex gap-3 align-items-center">
        <i class="bi bi-search" />
        <div class="input-group input-group-lg">
          <input
            type="text"
            className="form-control border border-opacity-10"
            value={state.questionRef}
            placeholder="Your wish is my command"
            onChange={(e) => {
              State.update({ refInput: e.target.value });
            }}
          />
        </div>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            State.update({ questionRef: state.refInput });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

const asker = state.questionRef.split("--")[0];

const question = Social.get(
  `${asker}/experimental/genie/questions/${state.questionRef}`
);

return (
  <div className="d-flex flex-column gap-1">
    <div className="d-flex align-items-center">
      <div>
        <small>avatar</small>
      </div>
      <div className="d-flex flex-column">
        <h4>{asker}</h4>
        {state.questionRef}
      </div>
    </div>
    <h3>{question}</h3>
  </div>
);
