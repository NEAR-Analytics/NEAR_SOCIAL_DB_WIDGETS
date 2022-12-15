const { questionRef } = props;

if (!questionRef) {
  return "No question ref provided";
}

const answers = Social.index("genie", `answered/${questionRef}`);

return (
  <div className="d-flex flex-column gap-3">
    {answers?.length ? (
      answers.map((a) => (
        <Widget
          src="dmitriy_sheleg.near/widget/GenieAnswerView"
          props={{ questionRef, answeredBy: a.accountId }}
        />
      ))
    ) : (
      <div className="alert alert-light">No answers, be the first!</div>
    )}
  </div>
);
