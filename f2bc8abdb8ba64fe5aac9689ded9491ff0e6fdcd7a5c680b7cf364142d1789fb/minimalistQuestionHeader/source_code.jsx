let question = props;

if (!question) {
  return "Prop passed wrongly to minimalistQuestionHeader";
}

return (
  <div className="d-flex justify-content-start mb-3">
    <div
      className="d-flex justify-content-center align-item-middle"
      style={{
        borderRadius: "16px",
        backgroundColor: "#F2F6FA",
        marginRight: "0.8rem",
      }}
    >
      {question.value.questionType == "0" ? (
        <i
          className="bi bi-file-text"
          style={{ padding: "0.6rem", aspectRatio: "1" }}
        ></i>
      ) : (
        questionParams.value.questionType == "1" && (
          <i
            style={{
              transform: "rotate(90deg)",
              padding: "0.6rem",
              aspectRatio: "1",
            }}
            className="bi bi-bar-chart-line"
          ></i>
        )
      )}
    </div>
    <h3 style={{ wordWrap: "anywhere" }}>{question.value.title}</h3>
  </div>
);
