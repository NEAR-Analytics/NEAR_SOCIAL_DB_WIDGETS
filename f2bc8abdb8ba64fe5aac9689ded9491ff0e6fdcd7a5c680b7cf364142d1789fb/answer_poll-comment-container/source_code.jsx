console.log("props: ", props);
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
      <div className="flex-column my-2 border border-primary p-2">
        <p className="m-3">{answer.value.answer[questionNumber]}</p>
      </div>;
    })}
  </>
);
