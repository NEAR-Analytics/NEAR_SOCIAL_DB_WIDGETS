const { questionRef } = props;

if (!questionRef) {
  return "No question ref provided";
}

const answers = Social.index("genie", `answered/${questionRef}`);
const relevantAnswers = answers.filter((a) => a.value === questionRef);

return (
  <div className="d-flex flex-column gap-3">
    {relevantAnswers?.length ? (
      relevantAnswers.map((a) => (
        <Widget
          src="michaelpeter.near/widget/GenieAnswerView"
          props={{ questionRef: a.value, answeredBy: a.accountId }}
        />
      ))
    ) : (
      <div className="alert alert-light">No answers, be the first!</div>
    )}
  </div>
);
