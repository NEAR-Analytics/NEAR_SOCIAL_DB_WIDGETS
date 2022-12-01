const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to add a new blog entry";
}

initState({
  question: "",
  typeOfAnswer: "",
  amountOfChoices: "1",
  choices: [],
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
  });
};

const handleWriteChoiceInputChange = (choiceNumber) => {
  return (event) => {
    const choices = state.choices;

    let newChoices = [];
    if (event.target.value == "" && choices.length == choiceNumber + 1) {
      for (let i = 0; i < choices.length; i++) {
        if (i != choiceNumber) {
          newChoices.push(choices[i]);
        }
      }
    } else {
      choices[Number(choiceNumber)] = event.target.value;
      newChoices = choices;
    }
    State.update({
      choices: newChoices,
    });
    a;

    if (
      newChoices[state.amountOfChoices] != "" &&
      Number(state.amountOfChoices) == choiceNumber + 1
    ) {
      changeAmountOfChoices(1);
    } else if (
      (newChoices[Number(state.amountOfChoices) - 2] == "" ||
        newChoices[Number(state.amountOfChoices) - 2] == undefined) &&
      Number(state.amountOfChoices - 1) == choiceNumber + 1
    ) {
      changeAmountOfChoices(-1);
    }
  };
};

function deleteChoiceHandler(choiceNumber) {
  return () => {
    let choices = state.choices;
    let newChoices = [];
    let countDeleted = 0;
    for (let i = 0; i < choices.length; i++) {
      if (i != choiceNumber) {
        newChoices.push(choices[i]);
      } else {
        countDeleted++;
      }
    }
    newChoices.push("");

    State.update({
      amountOfChoices: Number(state.amountOfChoices) - countDeleted,
      choices: newChoices,
    });
  };
}

function onChangeTypeOfAnswer(e) {
  const typeOfAnswer = e.target.value;

  State.update({
    typeOfAnswer: typeOfAnswer,
  });
}

function changeAmountOfChoices(changeValue) {
  State.update({
    amountOfChoices: Number(state.amountOfChoices) + changeValue + "",
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
            <div className="d-flex">
              <input
                type="text"
                className="w-100 mx-2"
                value={state.choices[choiceNumber]}
                onChange={handleWriteChoiceInputChange(choiceNumber)}
              />
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={deleteChoiceHandler(choiceNumber)}
              >
                <i className="bi bi-x-octagon"></i>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

function deleteEmptyChoices() {
  let filteredChoices = state.choices.filter((choice) => choice != "");

  return filteredChoices;
}
a;

function renderCommitButton() {
  if (state.typeOfAnswer == "2") {
    return (
      <CommitButton
        data={{
          index: {
            poll_question: JSON.stringify(
              {
                key: "question-v2.2.1",
                value: {
                  question: state.question,
                  questionType: state.typeOfAnswer,
                  choicesOptions: deleteEmptyChoices(),
                  timestamp: Date.now(),
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
    );
  } else {
    return (
      <CommitButton
        data={{
          index: {
            poll_question: JSON.stringify(
              {
                key: "question-v2.2.1",
                value: {
                  question: entry.question,
                  questionType: state.typeOfAnswer,
                  timestamp: Date.now(),
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
    );
  }
}

function renderInstructionsToCommit() {
  if (state.question == "" && state.typeOfAnswer == "") {
    return (
      <p className="text-primary">
        Make a question and choose a type of answer
      </p>
    );
  } else if (state.question == "") {
    return <p className="text-primary">Make a question</p>;
  } else {
    return <p className="text-primary">Choose a type of answer</p>;
  }
}

// function renderChoicesInputs() {
//   return (
//     <>
//       <h5>Select amount of choices</h5>
//       <div className="d-flex">
//         <div className="form-check mx-2">
//           <input
//             key={state.amountOfChoices}
//             className="form-check-input"
//             type="radio"
//             name="choicesRadio"
//             id="twoChoices"
//             value="2"
//             onChange={onChangeAmountOfChoices}
//             checked={state.amountOfChoices == "2"}
//           />
//           <label className="form-check-label" for="twoChoices">
//             2
//           </label>
//         </div>
//         <div className="form-check mx-2">
//           <input
//             key={state.amountOfChoices}
//             className="form-check-input"
//             type="radio"
//             name="choicesRadio"
//             id="threeChoices"
//             value="3"
//             onChange={onChangeAmountOfChoices}
//             checked={state.amountOfChoices == "3"}
//           />
//           <label className="form-check-label" for="threeChoices">
//             3
//           </label>
//         </div>
//         <div className="form-check mx-2">
//           <input
//             key={state.amountOfChoices}
//             className="form-check-input"
//             type="radio"
//             name="choicesRadio"
//             id="fourChoices"
//             value="4"
//             onChange={onChangeAmountOfChoices}
//             checked={state.amountOfChoices == "4"}
//           />
//           <label className="form-check-label" for="fourChoices">
//             4
//           </label>
//         </div>
//         <div className="form-check mx-2">
//           <input
//             key={state.amountOfChoices}
//             className="form-check-input"
//             type="radio"
//             name="choicesRadio"
//             id="fiveChoices"
//             value="5"
//             onChange={onChangeAmountOfChoices}
//             checked={state.amountOfChoices == "5"}
//           />
//           <label className="form-check-label" for="fiveChoices">
//             5
//           </label>
//         </div>
//       </div>
//       {renderTextInputsForChoices()}
//     </>
//   );
// }

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

    {state.typeOfAnswer == "2" && renderTextInputsForChoices()}

    {state.question == "" || state.typeOfAnswer == ""
      ? renderInstructionsToCommit()
      : renderCommitButton()}
  </div>
);
