let question = props;

let options = {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: "false",
};

if (!question) {
  return "Prop passed wrongly to minimalistQuestionHeader";
}

function makeAccountIdShorter(accountId) {
  if (accountId.length > 12) {
    return accountId.slice(0, 12) + "...";
  }
  return accountId;
}

function getValidAnswersQtyFromQuestion() {
  let questionBlockHeight = question.blockHeight;

  const answers = Social.index("poll_question", "answer-v3.0.1");
  if (!answers) {
    return "Loading...";
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
      className="d-flex justify-content-around"
      style={{
        border: "1.5px solid #F2F6FA",
        borderRadius: "16px",
      }}
    >
      <div className="px-2 my-2">
        <p style={{ margin: "0" }}>Created by</p>
        <p
          style={{
            fontWeight: "600",
            color: "#4B516A",
            margin: "0",
          }}
        >
          {makeAccountIdShorter(question.accountId)}
        </p>
      </div>

      <div
        className="px-2 my-2"
        style={{
          borderLeft: "1.5px solid #F2F6FA",
          borderRight: "1.5px solid #F2F6FA",
        }}
      >
        <p style={{ margin: "0" }}>Started</p>
        <p
          style={{
            fontWeight: "600",
            color: "#4B516A",
            margin: "0",
          }}
        >
          {new Date(question.value.startTimestamp).toLocaleDateString(
            [],
            options
          )}
        </p>
      </div>

      <div className="px-2 my-2">
        <p style={{ margin: "0" }}>Ends</p>
        <p
          style={{
            fontWeight: "600",
            letterSpacing: "-0.1em",
            color: "#4B516A",
            margin: "0",
          }}
        >
          {new Date(question.value.endTimestamp).toLocaleDateString(
            [],
            options
          )}
        </p>
      </div>
    </div>
    <div className="d-flex justify-content-between mt-3">
      <div className="d-flex">
        <i className="bi bi-people"></i>
        <span>
          {getValidAnswersQtyFromQuestion(question.blockHeight)} votes
        </span>
      </div>
      <span
        style={{
          backgroundColor: isQuestionActive(question) ? "#D9FCEF" : "#FFE5E5",

          height: "1.5rem",
          width: "4rem",
          textAlign: "center",
          borderRadius: "16px",
          marginRight: "1rem",
          lineHeight: "1.5rem",
          fontSize: "0.8rem",
          letterSpacing: "-0.025rem",
          color: isQuestionActive(question) ? "#00B37D" : "#FF4747",
          fontWeight: "500",
        }}
      >
        {isQuestionActive(question) ? "Active" : "Closed"}
      </span>
    </div>
  </div>
);
