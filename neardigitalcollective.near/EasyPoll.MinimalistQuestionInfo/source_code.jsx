let poll = props;

let dateFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: "false",
};

if (!poll) {
  return "Prop passed wrongly to minimalistQuestionHeader";
}

function makeAccountIdShorter(accountId) {
  if (accountId.length > 12) {
    return accountId.slice(0, 12) + "...";
  }
  return accountId;
}

State.init({
  answers: {},
});

function getValidAnswersQtyFromQuestion() {
  let questionBlockHeight = poll.blockHeight;

  const answers = Social.index("poll_question", "answer-v3.2.1");

  if (JSON.stringify(answers) != JSON.stringify(state.answers)) {
    State.update({ answers: answers });
  }
  if (!answers) {
    return "Loading...";
  }
  const answersFromThisPoll = state.answers.filter(
    (a) => a.value.questionBlockHeight == questionBlockHeight
  );
  const usersWithAnswers = answersFromThisPoll.map((a) => a.accountId);
  const usersWithAnswersWithoutDuplicates = usersWithAnswers.filter(
    (u, index) => usersWithAnswers.indexOf(u) == index
  );
  return usersWithAnswersWithoutDuplicates.length;
}

function isActive() {
  return (
    poll.value.startTimestamp < Date.now() &&
    Date.now() < poll.value.endTimestamp
  );
}

function isUpcoming() {
  return poll.value.startTimestamp > Date.now();
}

return (
  <div className="mt-2 pt-2">
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
          {makeAccountIdShorter(poll.accountId)}
        </p>
      </div>

      <div
        className="px-2 my-2"
        style={{
          borderLeft: "1.5px solid #F2F6FA",
          borderRight: "1.5px solid #F2F6FA",
        }}
      >
        {Date.now() > poll.value.startTimestamp ? (
          <p style={{ margin: "0" }}>Started</p>
        ) : (
          <p style={{ margin: "0" }}>Start</p>
        )}
        <p
          style={{
            fontWeight: "600",
            color: "#4B516A",
            margin: "0",
          }}
        >
          {new Date(poll.value.startTimestamp).toLocaleDateString(
            [],
            dateFormatOptions
          )}
        </p>
      </div>

      <div className="px-2 my-2">
        {Date.now() > poll.value.endTimestamp ? (
          <p style={{ margin: "0" }}>Ended</p>
        ) : (
          <p style={{ margin: "0" }}>Ends</p>
        )}
        <p
          style={{
            fontWeight: "600",
            letterSpacing: "-0.1em",
            color: "#4B516A",
            margin: "0",
          }}
        >
          {new Date(poll.value.endTimestamp).toLocaleDateString(
            [],
            dateFormatOptions
          )}
        </p>
      </div>
    </div>
    <div className="d-flex justify-content-between mt-3">
      <div className="d-flex">
        <i className="bi bi-people" style={{ marginRight: "0.3rem" }}></i>
        <span>{getValidAnswersQtyFromQuestion(poll.blockHeight)} votes</span>
      </div>
      <span
        style={{
          backgroundColor: isUpcoming()
            ? "#FFF3B4"
            : isActive()
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
          color: isUpcoming() ? "#FFC905" : isActive() ? "#00B37D" : "#FF4747",
          fontWeight: "500",
        }}
      >
        {isUpcoming() ? "Upcoming" : isActive() ? "Active" : "Closed"}
      </span>
    </div>
  </div>
);
