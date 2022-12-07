State.init({
  pollTitle: "",
  pollDescription: "",
  pollDiscussionLink: "",
  pollStartDate: "",
  pollEndDate: "",
  question: "",
  poolType: "2",
  choices: [],
  amountOfChoices: 1,
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

return (
  <div className="d-flex align-items-start">
    <div className="form-group">
      <label for="pollTitle">Title</label>
      <input
        type="text"
        className="mb-2"
        id="pollTitle"
        value={state.pollTitle}
      />
      <label for="pollDescription">Description</label>
      <textarea
        id="pollDescription"
        rows="3"
        value={state.pollDescription}
      ></textarea>
      <label for="pollDiscussionLink">Discussion link(optional)</label>
      <input
        type="text"
        className="mb-2"
        id="pollDiscussionLink"
        value={state.pollDiscussionLink}
      />
      <div className="d-flex">
        <label for="pollStartDate">Start date</label>
        //You have min and max propertuies on dates input
        <input type="date" id="pollStartDate" value={state.pollStartDate} />
        <label for="pollEndDate">End date</label>
        <input type="date" id="pollStartDate" value={state.pollEndDate} />
      </div>
      <div className="bd-example">
        <label for="question">Question</label>
        <input type="text" id="question" value={state.question} />
        <label for="poolType">Pool type</label>
        <select id="poolType">
          <option>Choose...</option>
          <option value="0">Yes/No</option>
          <option value="1">Text</option>
          <option value="2">Multiple choice</option>
        </select>
        {state.poolType == "2" && renderTextInputsForChoices()}
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
