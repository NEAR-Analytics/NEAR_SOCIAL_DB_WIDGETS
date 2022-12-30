let question = props;

if (!question) {
  return "Prop passed wrongly to minimalistQuestionHeader";
}

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
      {question.value.questionType == "0" ? (
        <i className="bi bi-file-text" style={{ padding: "0.6rem 0.8rem" }}></i>
      ) : (
        question.value.questionType == "1" && (
          <i
            style={{
              transform: "rotate(90deg)",
              padding: "0.6rem 0.8rem",
            }}
            className="bi bi-bar-chart-line"
          ></i>
        )
      )}
    </div>
    <h3
      style={{
        margin: "0",
        wordWrap: "anywhere",
        fontSize: "1.3rem",
        fontWeight: "700",
      }}
    >
      {question.value.title}
    </h3>
  </div>
);
