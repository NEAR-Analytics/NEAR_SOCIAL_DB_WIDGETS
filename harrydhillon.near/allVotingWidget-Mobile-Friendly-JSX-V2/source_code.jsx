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
              props.newVote[questionNumber] = e.target.value;

              props.stateUpdate({ vote: newVote });
            }}
            style={{ width: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

return (
  <>
    <Widget
      src="harrydhillon.near/widget/allVotingWidget-JSX-Return-Mobile-Friendly"
      props={{
        state: props.state,
        poll: props.poll,
        renderTextInput,
        renderMultipleChoiceInput: (
          questionNumber,
          questionType,
          option,
          optionNumber
        ) => (
          <Widget
            src="harrydhillon.near/widget/allVotingWidget-RenderMultiInput-Mobile-Friendly"
            props={{
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
              clickRadioInputHandler: props.clickRadioInputHandler,
              clickCheckboxInputHandler: props.clickCheckboxInputHandler,
              clickRadioInputHandler: props.clickRadioInputHandler,
              clickCheckboxInputHandler: props.clickCheckboxInputHandler,
              getInputStyles: props.getInputStyles,
            }}
          />
        ),
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
