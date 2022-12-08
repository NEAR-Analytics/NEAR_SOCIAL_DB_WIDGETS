State.init({
  pollTitle: "",
  pollDescription: "",
  pollDiscussionLink: "",
  pollStartDate: "",
  startTime: "",
  pollEndDate: "",
  endTime: "",
  question: "",
  pollType: "2",
  choices: [],
  amountOfChoices: 1,
  expandOptions: false,
});

const renderTextInputsForChoices = () => {
  let amountOfChoices = [];

  for (let i = 0; i < state.amountOfChoices; i++) {
    amountOfChoices.push(i);
  }

  return (
    <>
      {amountOfChoices.map((choiceNumber) => {
        return (
          <div className="my-3" key={`choice-input-${choiceNumber}`}>
            <label>Answer option {choiceNumber + 1}</label>
            <div className="d-flex">
              <input
                style={{
                  backgroundColor: "rgb(230, 230, 230)",
                  border: "1px solid #ced4da",
                  borderRadius: "0.375rem",
                }}
                type="text"
                className="w-100 mx-2"
                value={state.choices[choiceNumber]}
                // onChange={handleWriteChoiceInputChange(choiceNumber)}
              />
              <button
                type="button"
                className="btn btn-outline-danger"
                // onClick={deleteChoiceHandler(choiceNumber)}
              >
                <i className="bi bi-x-octagon"></i>
              </button>
            </div>
          </div>
        );
      })}
      <button
        type="button"
        className="btn btn-outline-primary d-flex"
        style={{ margin: "0 auto" }}
      >
        <i class="bi bi-plus-lg"></i>
        <span>Add option</span>
      </button>
    </>
  );
};

const renderOptions = () => {
  return (
    <div style={{ width: "max-content" }}>
      <input
        style={{
          backgroundColor: "rgb(230, 230, 230)",
          borderRadius: "0px",
          position: "absolute",
          top: "100%",
          minWidth: "max-content",
          width: "152px",
        }}
        type="text"
        value="Yes/No"
        readonly
        onClick={() => {
          State.update({ pollType: "0", expandOptions: !state.expandOptions });
        }}
      />

      <input
        style={{
          backgroundColor: "rgb(230, 230, 230)",
          borderRadius: "0px",
          position: "absolute",
          top: "200%",
          minWidth: "max-content",
          width: "152px",
        }}
        type="text"
        value="Text"
        readonly
        onClick={() => {
          State.update({ pollType: "1", expandOptions: !state.expandOptions });
        }}
      />

      <input
        style={{
          backgroundColor: "rgb(230, 230, 230)",
          borderRadius: "0px",
          position: "absolute",
          top: "300%",
          minWidth: "max-content",
          width: "152px",
        }}
        type="text"
        value="Multiple choice"
        readonly
        onClick={() => {
          State.update({ pollType: "2", expandOptions: !state.expandOptions });
        }}
      />
    </div>
  );
};

return (
  <div
    className="d-flex align-items-start justify-content-around pt-4"
    style={{ borderRadius: "0.375rem", height: "100%" }}
  >
    <div className="d-flex flex-column w-75 justify-content-around">
      <label for="pollTitle">Title</label>
      <input
        style={{
          backgroundColor: "rgb(230, 230, 230)",
          border: "1px solid #ced4da",
          borderRadius: "0.375rem",
        }}
        type="text"
        className="mb-2"
        id="pollTitle"
        value={state.pollTitle}
        onChange={(e) => {
          State.update({ pollTitle: e.target.value });
        }}
      />

      <label for="pollDescription" className="mt-2">
        Description
      </label>
      <textarea
        id="pollDescription"
        style={{
          backgroundColor: "rgb(230, 230, 230)",
          border: "1px solid #ced4da",
          borderRadius: "0.375rem",
        }}
        rows="3"
        value={state.pollDescription}
        onChange={(e) => {
          State.update({ pollDescription: e.target.value });
        }}
      ></textarea>

      <label for="pollDiscussionLink" className="mt-3">
        Discussion link (optional)
      </label>
      <input
        style={{
          backgroundColor: "rgb(230, 230, 230)",
          border: "1px solid #ced4da",
          borderRadius: "0.375rem",
        }}
        type="text"
        className="mb-2"
        id="pollDiscussionLink"
        value={state.pollDiscussionLink}
        onChange={(e) => {
          State.update({ pollDiscussionLink: e.target.value });
        }}
      />

      <div
        className="d-flex justify-content-around flex-wrap"
        style={{ maxWidth: "100%" }}
      >
        <div className="d-flex flex-row">
          <div className="d-flex flex-column mx-2">
            <label for="pollStartDate">Start date</label>
            {/*You have min and max propertuies on dates input*/}
            <input
              style={{ backgroundColor: "rgb(230, 230, 230)" }}
              type="date"
              id="pollStartDate"
              value={state.pollStartDate}
              onChange={(e) => {
                State.update({ pollStartDate: e.target.value });
              }}
            />
          </div>
          <div>
            <div>Start time</div>
            <input
              type="time"
              style={{ backgroundColor: "rgb(230, 230, 230)" }}
              onChange={(e) => {
                State.update({ startTime: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="d-flex flex-row">
          <div className="d-flex flex-column mx-2">
            <label for="pollEndDate">End date</label>
            <input
              style={{ backgroundColor: "rgb(230, 230, 230)" }}
              type="date"
              id="pollStartDate"
              value={state.pollEndDate}
              onChange={(e) => {
                State.update({ pollEndDate: e.target.value });
              }}
            />
          </div>
          <div>
            <div>End time</div>
            <input
              type="time"
              style={{ backgroundColor: "rgb(230, 230, 230)" }}
              value={state.endTime}
              onChange={(e) => {
                State.update({ endTime: e.target.value });
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{ border: "1px solid #ced4da", borderRadius: "0.375rem" }}
        className="p-3 my-3"
      >
        <label for="question">Question</label>
        <input
          style={{ backgroundColor: "rgb(230, 230, 230)" }}
          type="text"
          id="question"
          value={state.question}
          onChange={(e) => {
            State.update({ question: e.target.value });
          }}
        />
        <label className="mt-3" for="pollType">
          Pool type
        </label>
        <div className="dropdown">
          <button
            style={{ backgroundColor: "rgb(230, 230, 230)" }}
            className="btn dropdown-toggle"
            type="button"
            onClick={() => {
              State.update({ expandOptions: !state.expandOptions });
            }}
          >
            {state.pollType == "0"
              ? "Yes/No"
              : state.pollType == "1"
              ? "Text"
              : "Multiple choice"}
          </button>

          {state.expandOptions && renderOptions()}
        </div>
        {state.pollType == "2" && renderTextInputsForChoices()}
      </div>
      <div
        style={{
          height: "150px",
          border: "1px solid #ced4da",
          borderRadius: "0.375rem",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <i class="bi bi-plus-lg"></i>
        <span>Click to add another one question</span>
      </div>
    </div>

    <div
      style={{ border: "1px solid #ced4da", borderRadius: "0.375rem" }}
      className="p-3 d-flex flex-column justify-content-center"
    >
      <button type="button" className="my-2 btn btn-outline-primary">
        Preview
      </button>
      <button type="button" className="my-2 btn btn-primary">
        Create poll
      </button>
    </div>
  </div>
);
