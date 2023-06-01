const widgetOwner = "neardigitalcollective.near";
const renderTextInput = (questionNumber) => {
  return (
    <div>
      {props.hasVoted ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
          {props.renderAnswers(questionNumber)}
        </div>
      ) : (
        <div>
          <textarea
            value={props.state.vote[questionNumber]}
            onChange={(e) => {
              let newVote = props.state.vote;
              newVote[questionNumber] = e.target.value;

              props.stateUpdate({ vote: newVote });
            }}
            style={{ width: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

const renderMultipleChoiceInput = ({
  questionNumber,
  questionType,
  option,
  optionNumber,
}) => (
  <>
    <Widget
      src={`${widgetOwner}/widget/EasyPoll.DisplayMultiVote`}
      props={{
        state: props.state,
        questionNumber,
        questionType,
        option,
        optionNumber,
        canVote: props.canVote,
        getBgColor: props.getBgColor,
        getFontColor: props.getFontColor,
        countVotes: props.countVotes,
        getBorderRadious: props.getBorderRadious,
        calculatePercentageOfOption: props.calculatePercentageOfOption,
        getBlockTimestamp: props.getBlockTimestamp,
        clickCheckboxInputHandler: props.clickCheckboxInputHandler,
        clickRadioInputHandler: props.clickRadioInputHandler,
        getInputStyles: props.getInputStyles,
      }}
    />
  </>
);

return (
  <>
    <Widget
      src={`${widgetOwner}/widget/EasyPoll.DisplayMultiVote2`}
      props={{
        state: props.state,
        poll: props.poll,
        renderTextInput,
        renderMultipleChoiceInput,
        getInputStyles: props.getInputStyles,
        hasVoted: props.hasVoted,
        getPublicationParams: props.getPublicationParams,
        stateUpdate: (data) => props.stateUpdate(data),
        isQuestionOpen: props.isQuestionOpen,
        isVoteValid: props.isVoteValid,
        validAnswersToThisPoll: props.validAnswersToThisPoll,
      }}
    />
  </>
);
