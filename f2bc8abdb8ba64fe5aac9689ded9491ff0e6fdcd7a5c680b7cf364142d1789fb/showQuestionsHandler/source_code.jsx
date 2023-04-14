function addAnswersToQuestion(questions, answers) {
  questions = questions.map((q) => {
    q.value.answers = [];
    return q;
  });
  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i];
    const qIndex = questions.findIndex(
      (q) => q.blockHeight == answer.value.questionBlockHeight
    );
    if (qIndex != -1) questions[qIndex].value.answers.push(answer);
    if (qIndex == -1) console.log(`Answer has no related question!`, answer);
  }
  return questions;
}

const displayAnswerWidgetNames = [
  "newTextAnswerInterface",
  "newMiniMultipleChoiceInterface",
];

let questions = Social.index("poll_question", "question-v3.0.1", {
  accountId: props.accountId,
});

const answers = Social.index("poll_question", "answer-v3.0.1");
questions = addAnswersToQuestion(questions, answers);

const renderQuestions = () => {
  return questions.map((question) => {
    return (
      <a
        href={`#${context.accountId}/widget/newVotingInterface?blockHeight=${question.blockHeight}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div
          className="my-5 py-3 px-4"
          style={{ backgroundColor: "#f2f2f2", borderRadius: "1rem" }}
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
      padding: "8% 5% 1% 5%",
    }}
  >
    {renderQuestions()}
  </div>
);
