State.init({ selectedQuestion: "" });

if (!selectedQuestion)
  return (
    <div className="d-flex flex-column gap-3">
      <Widget src="dmitriy_sheleg.near/widget/SaveQuestion" />
      <Widget src="dmitriy_sheleg.near/widget/GenieQuestionList" />
    </div>
  );
