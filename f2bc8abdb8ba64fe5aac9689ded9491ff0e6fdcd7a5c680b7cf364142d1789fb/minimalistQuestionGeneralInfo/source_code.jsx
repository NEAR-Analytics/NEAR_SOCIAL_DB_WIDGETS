let question = props.question;

if (!question) {
  return "Prop passed wrongly to minimalistQuestionHeader";
}

function getValidAnswersQtyFromQuestion() {
  let questionBlockHeight = question.blockHeight;

  const answers = Social.index("poll_question", "answer-v3.0.1");
  if (!answers) {
    return "Loading";
  }
  const answersFromThisQuestion = answers.filter(
    (a) => a.value.questionBlockHeight == questionBlockHeight
  );
  const usersWithAnswers = answersFromThisQuestion.map((a) => a.accountId);
  const usersWithAnswersWithoutDuplicates = usersWithAnswers.filter(
    (u, index) => usersWithAnswers.indexOf(u) == index
  );
  return usersWithAnswersWithoutDuplicates.length;
}

function isQuestionActive(question) {
  return (
    question.value.startTimestamp < Date.now() &&
    Date.now() < question.value.endTimestamp
  );
}

return (
  <div>
    <div
      className="d-flex"
      style={{
        border: "1.5px solid #F2F6FA",
        borderRadius: "16px",
      }}
    >
      <div className="px-2 my-2">
        <p>Created by</p>
        <p
          style={{
            fontWeight: "500",
            letterSpacing: "-0.1em",
            color: "#4B516A",
          }}
        >
          {question.accountId}
        </p>
      </div>

      <div
        className="px-2 my-2"
        style={{
          borderLeft: "1.5px solid #F2F6FA",
          borderRight: "1.5px solid #F2F6FA",
        }}
      >
        <p>Started</p>
        <p
          style={{
            fontWeight: "500",
            letterSpacing: "-0.1em",
            color: "#4B516A",
          }}
        >
          {new Date(question.startTimestamp).toLocaleDateString()}
        </p>
      </div>

      <div className="px-2 my-2">
        <p>Ends</p>
        <p
          style={{
            fontWeight: "500",
            letterSpacing: "-0.1em",
            color: "#4B516A",
          }}
        >
          {new Date(question.endTimestamp).toLocaleDateString()}
        </p>
      </div>
    </div>
    <div className="d-flex justify-content-between">
      <div className="d-flex">
        <i className="bi bi-people"></i>
        <span>
          {getValidAnswersQtyFromQuestion(questionByCreator.blockHeight)} votes
        </span>
      </div>
      <span
        style={{
          backgroundColor: isQuestionActive(questionByCreator)
            ? "#D9FCEF"
            : "#FFE5E5",

          height: "1.5rem",
          width: "4rem",
          textAlign: "center",
          borderRadius: "16px",
          marginRight: "1rem",
          lineHeight: "1.5rem",
          fontSize: "0.8rem",
          letterSpacing: "-0.025rem",
          color: isQuestionActive(questionByCreator) ? "#00B37D" : "#FF4747",
          fontWeight: "500",
        }}
      >
        {isQuestionActive(questionByCreator) ? "Active" : "Closed"}
      </span>
    </div>
  </div>
);
