if (!props.validAnswersToThisPoll) {
  return "Prop validAnswersToThisPoll not set";
}

if (!props.questionNumber) {
  return "Prop questionNumber not set";
}
let answers = props.validAnswersToThisPoll;
console.log("answers: ", answers);
let questionNumber = props.questionNumber;

return (
  <>
    {answers.map((answer, index) => {
      <div className="flex-column my-2 border border-primary p-2">
        if(questionNumber == index) return (<p className="m-3">{answer}</p>);
      </div>;
    })}
  </>
);
