const { answeredBy, questionRef } = props;

if (!answeredBy || !questionRef) {
  return "Missing prop in GenieAnswerView";
}

const answer = Social.get(
  `${answeredBy}/experimental/genie/answers/${questionRef}`
);

return <div className="border p-1">{answer}</div>;
