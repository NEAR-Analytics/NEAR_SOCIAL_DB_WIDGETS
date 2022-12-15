const { questionRef } = props;

if (!questionRef) {
  return "No question ref provided";
}

const answers = Social.index("genie", "answered1");

return (
  <div className="d-flex flex-column gap-3">
    {answers.map((a) => (
      <Widget
        src="michaelpeter.near/widget/GenieAnswerView"
        props={{ questionRef: a.questionRef, answeredBy: a.accountId }}
      />
    ))}
  </div>
);
