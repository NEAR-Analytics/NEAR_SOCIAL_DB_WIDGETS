const accountId = context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet to add a question :)";
}

State.init({
  question: { title: "", description: "" },
  done: false,
});

const question = {
  title: state.question.title,
  description: state.question.description,
};

const hasQuestion = question.title;

return (
  <div className="row mb-3">
    <div>
      <h4>Add a question</h4>
    </div>
    <div className="mb-2">
      Question:
      <br />
    </div>
    <div className="mb-2">
      Title <span className="text-secondary"></span>
      <input type="text" value={state.question.title} />
    </div>
    <div className="mb-2">
      Description <span className="text-secondary"></span>
      <input type="text" value={state.question.description} />
    </div>
    <div className="mb-2">
      {hasQuestion ? (
        <CommitButton
          data={{ post: { question } }}
          onCommit={() => {
            State.update({
              question: { title: "", description: "" },
              done: true,
            });
          }}
        >
          Post question
        </CommitButton>
      ) : (
        !props.noPrevQuestion && (
          <a
            className="btn btn-outline-primary"
            href={`#/infinity.near/widget/Question?accountId=${accountId}`}
          >
            View your last question
          </a>
        )
      )}
    </div>
    <hr />
    {state.done && !hasQuestion && (
      <div className="alert alert-success">Success!</div>
    )}
    {(hasQuestion || !props.noPrevQuestion) && (
      <Widget
        src="infinity.near/widget/Question"
        props={{ question: hasQuestion ? question : undefined }}
      />
    )}
  </div>
);
