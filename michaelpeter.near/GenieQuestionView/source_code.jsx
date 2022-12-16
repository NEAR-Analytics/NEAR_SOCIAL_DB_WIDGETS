const { questionRef, searchString } = props;

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

const question = Social.getr(
  `${asker}/experimental/genie/questions/${state.questionRef}`
);

return (
  <div className="d-flex flex-column gap-1">
    <div className="d-flex align-items-center">
      <div
        style={{ width: "100%" }}
        className="d-flex align-items-center justify-content-between"
      >
        <div className="d-flex align-items-center gap-2">
          <div
            style={{
              backgroundColor: "#000",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
            }}
          ></div>
          <div className="d-flex flex-column">
            <h6>{asker}</h6>
            {state.questionRef}
          </div>
        </div>
        <div>timestamp</div>
      </div>
    </div>
    <h3>{question.title}</h3>
    <h3>{question.content}</h3>
  </div>
);
