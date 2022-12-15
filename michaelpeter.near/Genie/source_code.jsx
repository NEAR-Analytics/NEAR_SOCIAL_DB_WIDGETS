State.init({ selectedQuestion: "" });

if (!selectedQuestion)
  return (
    <div className="d-flex flex-column gap-3">
      <Widget src="michaelpeter.near/widget/SaveQuestion" />
      <Widget src="michaelpeter.near/widget/GenieQuestionList" />
    </div>
  );
