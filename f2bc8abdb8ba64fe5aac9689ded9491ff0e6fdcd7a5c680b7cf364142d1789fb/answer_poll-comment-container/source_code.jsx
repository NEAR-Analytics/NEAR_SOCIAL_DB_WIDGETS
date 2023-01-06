console.log("props: ", props);
if (!props.answers) {
  return "Prop validAnswersToThisPoll not set";
}

if (!props.questionNumber) {
  return "Prop questionNumber not set";
}
let answers = JSON.parse(props.answers);
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
