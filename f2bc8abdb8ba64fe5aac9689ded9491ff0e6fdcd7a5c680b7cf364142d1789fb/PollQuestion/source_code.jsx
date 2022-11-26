const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to add a new blog entry";
}

initState({
  question: "",
  typeOfAnswer: "",
  amountOfChoices: "2",
  choices: {},
});

const entry = {
  question: state.question,
  typeOfAnswer: state.typeOfAnswer,
  amountOfChoices: state.amountOfChoices,
  choices: state.choices,
};

const handleMakeQuestionInputChange = (event) => {
  State.update({
    question: event.target.value,
    typeOfAnswer: state.typeOfAnswer,
    amountOfChoices: state.amountOfChoices,
    choices: state.choices,
  });
};

const handleWriteChoiceInputChange = (choiceNumber) => {
  return (event) => {
    const choices = state.choices;

    choices[Number(choiceNumber)] = event.target.value;

    State.update({
      question: state.question,
      typeOfAnswer: state.typeOfAnswer,
      amountOfChoices: state.amountOfChoices,
      choices: choices,
    });
  };
};

function onChangeTypeOfAnswer(e) {
  const typeOfAnswer = e.target.value;

  State.update({
    question: state.question,
    typeOfAnswer: typeOfAnswer,
    amountOfChoices: state.amountOfChoices,
    choices: state.choices,
  });
}

function onChangeAmountOfChoices(e) {
  State.update({
    question: state.question,
    typeOfAnswer: state.typeOfAnswer,
    amountOfChoices: e.target.value,
    choices: state.choices,
  });
}

function renderTextInputsForChoices() {
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
            <input
              type="text"
              className="mb-2 w-100"
              value={state.choices[choiceNumber]}
              onChange={handleWriteChoiceInputChange(choiceNumber)}
            />
          </div>
        );
      })}
    </>
  );
}

function renderChoicesInputs() {
  return (
    <>
      <h5>Select amount of choices</h5>
      <div className="d-flex">
        <div className="form-check mx-2">
          <input
            key={state.amountOfChoices}
            className="form-check-input"
            type="radio"
            name="choicesRadio"
            id="twoChoices"
            value="2"
            onChange={onChangeAmountOfChoices}
            checked={state.amountOfChoices == "2"}
          />
          <label className="form-check-label" for="twoChoices">
            2
          </label>
        </div>
        <div className="form-check mx-2">
          <input
            key={state.amountOfChoices}
            className="form-check-input"
            type="radio"
            name="choicesRadio"
            id="threeChoices"
            value="3"
            onChange={onChangeAmountOfChoices}
            checked={state.amountOfChoices == "3"}
          />
          <label className="form-check-label" for="threeChoices">
            3
          </label>
        </div>
        <div className="form-check mx-2">
          <input
            key={state.amountOfChoices}
            className="form-check-input"
            type="radio"
            name="choicesRadio"
            id="fourChoices"
            value="4"
            onChange={onChangeAmountOfChoices}
            checked={state.amountOfChoices == "4"}
          />
          <label className="form-check-label" for="fourChoices">
            4
          </label>
        </div>
        <div className="form-check mx-2">
          <input
            key={state.amountOfChoices}
            className="form-check-input"
            type="radio"
            name="choicesRadio"
            id="fiveChoices"
            value="5"
            onChange={onChangeAmountOfChoices}
            checked={state.amountOfChoices == "5"}
          />
          <label className="form-check-label" for="fiveChoices">
            5
          </label>
        </div>
      </div>
      {renderTextInputsForChoices()}
    </>
  );
}

return (
  <div className="row mb-3">
    <div>
      <h4>Make question</h4>
    </div>
    <input className="mb-2" value={state.question} />

    <h4>Choose type of answers</h4>

    <div className="form-check">
      <input
        key={state.typeOfAnswer}
        className="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="voteYesNo"
        value="0"
        onChange={onChangeTypeOfAnswer}
        checked={state.typeOfAnswer == "0"}
      />
      <label className="form-check-label" for="voteYesNo">
        Vote yes/no
      </label>
    </div>

    <div className="form-check">
      <input
        key={state.typeOfAnswer}
        className="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="text"
        value="1"
        onChange={onChangeTypeOfAnswer}
        checked={state.typeOfAnswer == "1"}
      />
      <label className="form-check-label" for="text">
        Text
      </label>
    </div>

    <div className="form-check">
      <input
        key={state.typeOfAnswer}
        className="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="multipleChoice"
        value="2"
        onChange={onChangeTypeOfAnswer}
        checked={state.typeOfAnswer == "2"}
      />
      <label className="form-check-label" for="multipleChoice">
        Multiple choice
      </label>
    </div>

    {state.typeOfAnswer == "2" && renderChoicesInputs()}

    <CommitButton
      data={{
        index: {
          poll_question: JSON.stringify(
            {
              key: "question-v2",
              value: {
                data: {
                  question: entry.question,
                  questionType: state.typeOfAnswer,
                  choicesOptions: state.choices,
                  timestamp: Date.now(),
                },
              },
            },
            undefined,
            0
          ),
        },
      }}
    >
      Submit
    </CommitButton>
  </div>
);
