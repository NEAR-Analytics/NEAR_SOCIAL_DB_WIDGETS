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

let questions = Social.index("poll_question", "question-v3.0.1");
const answers = Social.index("poll_question", "answer-v3.0.1");
questions = addAnswersToQuestion(questions, answers);
console.log(questions);

const renderQuestions = () => {
  return questions.map((question) => {
    return (
      <div
        className="my-5 py-3 px-4"
        style={{ backgroundColor: "#f2f2f2", borderRadius: "1rem" }}
      >
        <Widget
          src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/answersHeader"
          props={{ question: question }}
        />
        <Widget
          src={`${props.accountId}/widget/${
            displayAnswerWidgetNames[question.questionType]
          }`}
          props={{ question: question }}
        />
      </div>
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
