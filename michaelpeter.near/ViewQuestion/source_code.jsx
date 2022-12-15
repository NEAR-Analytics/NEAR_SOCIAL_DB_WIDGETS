const { questionRef } = props;

if (!questionRef) {
  return <p>Loading...</p>;
}

const question = Social.get(
  `michaelpeter.near/experimental/genie/questions/${questionRef}`
);
return (
  <div className="d-flex flex-column gap-3">
    <p>QuestionRef: {questionRef}</p>
    <p>Question: {JSON.stringify(question, null, 4)}</p>
  </div>
);
