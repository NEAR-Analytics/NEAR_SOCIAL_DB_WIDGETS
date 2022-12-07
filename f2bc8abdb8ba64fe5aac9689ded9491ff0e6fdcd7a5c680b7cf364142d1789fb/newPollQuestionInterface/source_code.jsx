State.init({
  pollTitle: "",
  pollDescription: "",
  pollDiscussionLink: "",
  pollStartDate: "",
  pollEndDate: "",
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
          <div className="my-1" key={`choice-input-${choiceNumber}`}>
            <h6>Choice numer {choiceNumber + 1}</h6>
            <div className="d-flex">
              <input
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
      <button type="button" className="btn btn-outline-primary d-flex">
        <i class="bi bi-plus-lg"></i>
        <span>Button</span>
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
          minWidth: "max-content",
          width: "100%",
        }}
        type="text"
        value="Yes/No"
        readonly
        onClick={() => {
          State.update({ pollType: "0" });
        }}
      />

      <input
        style={{
          backgroundColor: "rgb(230, 230, 230)",
          minWidth: "max-content",
          width: "100%",
        }}
        type="text"
        value="Text"
        readonly
        onClick={() => {
          State.update({ pollType: "1" });
        }}
      />

      <input
        style={{
          backgroundColor: "rgb(230, 230, 230)",
          minWidth: "max-content",
          width: "100%",
        }}
        type="text"
        value="Multiple choice"
        readonly
        onClick={() => {
          State.update({ pollType: "2" });
        }}
      />
    </div>
  );
};

return (
  <div
    className="d-flex align-items-start justify-content-around"
    style={{ borderRadius: "3px" }}
  >
    <div className="d-flex flex-column w-75 justify-content-around">
      <label for="pollTitle">Title</label>
      <input
        style={{ backgroundColor: "rgb(230, 230, 230)" }}
        type="text"
        className="mb-2"
        id="pollTitle"
        value={state.pollTitle}
      />

      <label for="pollDescription">Description</label>
      <textarea
        id="pollDescription"
        style={{ backgroundColor: "rgb(230, 230, 230)" }}
        rows="3"
        value={state.pollDescription}
      ></textarea>

      <label for="pollDiscussionLink">Discussion link (optional)</label>
      <input
        style={{ backgroundColor: "rgb(230, 230, 230)" }}
        type="text"
        className="mb-2"
        id="pollDiscussionLink"
        value={state.pollDiscussionLink}
      />

      <div
        className="d-flex justify-content-around flex-wrap"
        style={{ width: "50%", minWidth: "max-content", maxWidth: "100%" }}
      >
        <div className="d-flex flex-column">
          <label for="pollStartDate">Start date</label>
          {/*You have min and max propertuies on dates input*/}
          <input
            style={{ backgroundColor: "rgb(230, 230, 230)" }}
            type="date"
            id="pollStartDate"
            value={state.pollStartDate}
          />
        </div>

        <div className="d-flex flex-column">
          <label for="pollEndDate">End date</label>
          <input
            style={{ backgroundColor: "rgb(230, 230, 230)" }}
            type="date"
            id="pollStartDate"
            value={state.pollEndDate}
          />
        </div>
      </div>
      <div className="bd-example">
        <label for="question">Question</label>
        <input
          style={{ backgroundColor: "rgb(230, 230, 230)" }}
          type="text"
          id="question"
          value={state.question}
        />
        <label for="pollType">Pool type</label>
        <div className="dropdown">
          <button
            style={{ backgroundColor: "rgb(230, 230, 230)" }}
            className="btn dropdown-toggle"
            type="button"
            onClick={() => {
              console.log(state.expandOptions);
              State.update({ expandOptions: !state.expandOptions });
              console.log(state.expandOptions);
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
      <div className="bd-example d-flex justify-content-center">
        <i class="bi bi-plus-lg"></i>
        <span>Add another one question</span>
      </div>
    </div>

    <div className="bd-example">
      <button type="button" className="btn btn-outline-primary">
        Preview
      </button>
      <button type="button" className="btn btn-primary">
        Create poll
      </button>
    </div>
  </div>
);
