function validateProps(props) {
  let errors = [];
  if (!props.accountId) errors.push("Props don't contain accountId key");
  if (!props.blockHeight) errors.push("Props don't contain blockHeight key");
  if (!props.value) {
    errors.push("Props don't contain value key");
  } else {
    if (!props.value.answers)
      errors.push("Prop value doesn't contain answers key");
  }
  return errors;
}

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
    if (qIndex != -1) questions[qIndex].answers.push(answer);
    if (qIndex == -1) console.log(`Answer has no related question!`, answer);
  }
  return questions;
}

const displayAnswerWidgetNames = [
  "newTextAnswerInterface",
  "newMiniMultipleChoiceInterface",
];

console.log("props.accountId: ", props.accountId);
let questions = Social.index("poll_question", "question-v3.0.1", {
  accountId: props.accountId,
});

const answers = Social.index("poll_question", "answer-v3.0.1");
questions = addAnswersToQuestion(questions, answers);

const renderQuestions = () => {
  return questions.map((question) => {
    console.log(
      "W1",
      `${props.accountId}/widget/${
        displayAnswerWidgetNames[question.value.questionType]
      }`
    );
    return (
      <a
        href={`#${context.accountId}/widget/newVotingInterface?question=${question.blockHeight}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div
          className="my-5 py-3 px-4"
          style={{ backgroundColor: "#f2f2f2", borderRadius: "1rem" }}
        >
          <Widget
            src={`${props.accountId}/widget/answersHeader`}
            props={{ ...question }}
          />
          <Widget
            src={`${props.accountId}/widget/${
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
