initState({ showReply: false });

return (
  <div class="container">
    <div class="row">
      <div class="col-8">
        <h2>Questions</h2>
      </div>
      <div class="col-4 justify-content-end">
        <button
          class="btn btn-primary float-end"
          disabled={!context.accountId}
          onClick={() => {
            State.update({ showReply: !state.showReply });
          }}
        >
          Ask a Question
        </button>
      </div>
    </div>

    <div class="my-3">
      {state.showReply && (
        <Widget src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Edit" />
      )}
    </div>
    <Widget src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Feed" />
  </div>
);
