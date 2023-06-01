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
          <div
            style={
              i % 2 == 0 ? { marginRight: "0.5rem" } : { marginLeft: "0.5rem" }
            }
          >
            <p
              className="py-2 px-3"
              style={{
                backgroundColor: "#F2F6FA",
                color: "#59606A",
                border: "1px solid #F2F6FA",
                borderRadius: "8px",
                minHeight: "3rem",
              }}
            >
              {answer.value.answer[questionNumber]}
            </p>
          </div>
        );
      })}
    </>
  );
  