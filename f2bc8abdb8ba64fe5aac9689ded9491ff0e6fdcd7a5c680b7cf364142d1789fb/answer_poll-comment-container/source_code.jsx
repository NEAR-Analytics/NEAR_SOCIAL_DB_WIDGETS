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
    {answers.map((answer) => {
      return (
        <div className="m-3">
          <p
            className="py-1 px-2"
            style={{
              backgroundColor: "#F2F6FA",
              color: "#59606A",
              border: "1px solid #F2F6FA",
              borderRadius: "8px",
            }}
          >
            {answer.value.answer[questionNumber]}
          </p>
        </div>
      );
    })}
  </>
);
