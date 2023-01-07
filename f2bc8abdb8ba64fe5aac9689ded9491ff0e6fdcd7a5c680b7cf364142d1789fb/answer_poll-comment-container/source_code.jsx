if (!props.answers) {
  return "Prop validAnswersToThisPoll not set";
}

if (!props.questionNumber) {
  return "Prop questionNumber not set";
}
let answers = props.answers;
let questionNumber = props.questionNumber;

return (
  <>
    {answers.map((answer, i) => {
      return (
        <div className={i % 2 == 0 ? "mr-2" : "ml-2"}>
          <p
            className="py-2 px-3"
            style={{
              backgroundColor: "#F2F6FA",
              color: "#59606A",
              border: "1px solid #F2F6FA",
              borderRadius: "8px",
              minHeight: "2rem",
            }}
          >
            {answer.value.answer[questionNumber]}
          </p>
        </div>
      );
    })}
  </>
);
