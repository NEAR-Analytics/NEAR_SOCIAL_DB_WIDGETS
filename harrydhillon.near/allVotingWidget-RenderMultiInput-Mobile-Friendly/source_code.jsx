const renderMultipleChoiceInput = (
  questionNumber,
  questionType,
  option,
  optionNumber
) => {
  return (
    <>
      {!canVote ? (
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
        <>
          <Widget
            src={
              "harrydhillon.near/widget/allVotingWidget-Input-Mobile-Friendly"
            }
            props={{
              state: props.state,
              questionNumber: questionNumber,
              questionNumber: questionType,
              option: option,
              optionNumber: optionNumber,
              clickRadioInputHandler: props.clickRadioInputHandler,
              clickCheckboxInputHandler: props.clickCheckboxInputHandler,
              getInputStyles: props.getInputStyles,
            }}
          />
        </>
      )}
    </>
  );
};

return renderMultipleChoiceInput(
  props.questionNumber,
  props.questionType,
  props.option,
  props.optionNumber
);
