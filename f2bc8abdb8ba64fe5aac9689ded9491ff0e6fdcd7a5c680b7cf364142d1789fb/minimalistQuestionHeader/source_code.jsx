let poll = props;

if (!poll) {
  return "Prop passed wrongly to minimalistQuestionHeader";
}

const renderPollTypeIcon = () => {
  let allPollTypes = [];
  for (let i = 0; i < poll.value.questions.length; i++) {
    if (!allPollTypes.includes(poll.value.questions[i].questionType)) {
      allPollTypes.push(poll.value.questions[i].questionType);
    }
  }

  return allPollTypes.length == 1 &&
    (allPollTypes[0] == "0" || allPollTypes[0] == "1") ? (
    <i className="bi bi-pie-chart" style={{ padding: "0.6rem 0.8rem" }}></i>
  ) : allPollTypes.length == 1 && allPollTypes[0] == "2" ? (
    <i
      style={{
        transform: "rotate(90deg)",
        padding: "0.6rem 0.8rem",
      }}
      className="bi bi-bar-chart-line"
    ></i>
  ) : allPollTypes.length == 1 && allPollTypes[0] == "3" ? (
    <i className="bi bi-file-text" style={{ padding: "0.6rem 0.8rem" }}></i>
  ) : (
    <i className="bi bi-collection" style={{ padding: "0.6rem 0.8rem" }}></i>
  );
};

return (
  <div className="d-flex justify-content-start align-items-center mb-3">
    <div
      className="d-flex justify-content-center"
      style={{
        maxHeight: "2.8rem",
        aspectRatio: "1",
        borderRadius: "16px",
        backgroundColor: "#F2F6FA",
        marginRight: "0.8rem",
      }}
    >
      {renderPollTypeIcon()}
    </div>
    <h3
      style={{
        margin: "0",
        wordWrap: "anywhere",
        fontSize: "1.3rem",
        fontWeight: "700",
      }}
    >
      {poll.value.title}
    </h3>
  </div>
);
