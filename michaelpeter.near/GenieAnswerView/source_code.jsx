const { answeredBy, questionRef } = props;

if (!answeredBy || !questionRef) {
  return "Missing prop";
}

const answer = Social.get(
  `${answeredBy}/experimental/genie/answers/${questionRef}`
);

return <div>{answer}</div>;
