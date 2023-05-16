console.log(props, "fromm renderpercentage muti mobile");

const renderMultipleChoiceInput = (
  questionNumber,
  questionType,
  option,
  optionNumber
) => {
  return (
    <>
      {!props.canVote ? (
        <Widget
          src="harrydhillon.near/widget/allVotingWidget-Renderpercentage-Mobile-Friendly"
          props={{
            state: props.state,
            questionNumber: questionNumber,
            questionNumber: questionType,
            option: option,
            optionNumber: optionNumber,
            canVote: props.canVote,
            getBgColor: props.getBgColor,
            getFontColor: props.getFontColor,
            countVotes: props.countVotes,
            getBorderRadious: props.getBorderRadious,
            calculatePercentageOfOption: props.calculatePercentageOfOption,
            getBlockTimestamp: props.getBlockTimestamp,
            clickRadioInputHandler: props.clickRadioInputHandler,
            clickCheckboxInputHandler: props.clickCheckboxInputHandler,
          }}
        />
      ) : (
        <div className="d-flex align-content-center">
          <input
            className="form-check-input"
            id={`${questionNumber}-${optionNumber}`}
            name={`${questionNumber}-${questionType}`}
            key={`${questionNumber}-${optionNumber}-${props.state.vote}`}
            style={props.getInputStyles(
              questionType,
              questionNumber,
              optionNumber
            )}
            type={questionType == "2" ? "checkbox" : "radio"}
            value={optionNumber}
            checked={
              questionType == "2"
                ? props.state.vote[questionNumber].includes(optionNumber + "")
                : props.state.vote[questionNumber] == optionNumber + ""
            }
            onClick={
              questionType != "2" &&
              props.clickRadioInputHandler(questionNumber, optionNumber)
            }
            onChange={
              questionType == "2" &&
              props.clickCheckboxInputHandler(questionNumber, optionNumber)
            }
          />
          <label for={`${questionNumber}-${optionNumber}`}>{option}</label>
        </div>
      )}
    </>
  );
};

console.log(props, "from percentage");

return renderMultipleChoiceInput(
  props.questionNumber,
  props.questionType,
  props.option,
  props.optionNumber
);
