if (!props.validAnswersToThisPoll) {
  return "Prop validAnswersToThisPoll not set";
}

const answers = props.validAnswersToThisPoll;
const questionNumber = props.questionNumber;

return (
  <>
    {answers.map(answer, (index) => {
      if (questionNumber == index) {
        return (
          <div className="flex-column my-2 border border-primary p-2">
            <p className="m-3">{answer}</p>
          </div>
        );
      }
    })}
  </>
);
