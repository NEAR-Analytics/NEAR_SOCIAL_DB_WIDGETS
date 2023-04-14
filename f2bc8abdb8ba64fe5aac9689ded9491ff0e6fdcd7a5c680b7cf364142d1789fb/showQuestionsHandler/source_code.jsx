const displayAnswerWidgetNames = [
  "newTextAnswerInterface",
  "newMiniMultipleChoiceInterface",
];

let questions = Social.index("poll_question", "question-v3.0.1", {
  accountId: props.accountId,
});

const renderQuestions = () => {
  return questions.map((question) => {
    return (
      <a
        href={`#${context.accountId}/widget/newVotingInterface?blockHeight=${question.blockHeight}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div
          className="my-5 py-3 px-4"
          style={{ backgroundColor: "white", borderRadius: "1rem" }}
        >
          <Widget
            src={`${context.accountId}/widget/answersHeader`}
            props={{ ...question }}
          />
          <Widget
            src={`${context.accountId}/widget/${
              displayAnswerWidgetNames[question.value.questionType]
            }`}
            props={{ ...question }}
          />
        </div>
      </a>
    );
  });
};

return (
  <div
    style={{
      borderRadius: "3px",
      padding: "0px 2%",
    }}
  >
    {renderQuestions()}
  </div>
);
