const { answeredBy, questionRef } = props;

if (!answeredBy || !questionRef) {
  return "Missing prop in GenieAnswerView";
}

const answer = Social.get(
  `${answeredBy}/experimental/genie/answers/${questionRef}`
);

return (
  <div className="d-flex flex-column gap-1">
    <div className="border p-1 d-flex justify-content-between">
      <span>{answer}</span>
      <span>{answeredBy}</span>
    </div>
    <div className="d-flex justify-content-end">
      <Widget
        src="michaelpeter.near/widget/GenieAnswerVote"
        props={{ questionRef, answeredBy }}
      />
    </div>
  </div>
);
