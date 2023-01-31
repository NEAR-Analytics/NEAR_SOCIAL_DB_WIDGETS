// By default the form to ask a question is hidden
initState({ askQuestion: false });

return (
  <div class="container">
    <div class="row">
      <div class="col-8">
        <h1>Questions</h1>
      </div>
      <div class="col-4 justify-content-end">
        <button
          class="btn btn-primary float-end"
          disabled={!context.accountId}
          onClick={() => {
            State.update({ askQuestion: !state.askQuestion });
          }}
        >
          Ask a Question
        </button>
      </div>
    </div>
    {/* Element to create the question */}
    <div class="my-3">
      {state.askQuestion && (
        <Widget src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Edit" />
      )}
    </div>
    {/* Feed of Questions */}
    <Widget src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Feed" />
  </div>
);
