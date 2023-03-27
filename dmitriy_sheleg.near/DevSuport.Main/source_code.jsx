if (context.loading) {
  return "Loading";
}

// By default the form to ask a question is hidden
initState({ askQuestion: false });
const toggleQuestion = () => {
  State.update({ askQuestion: !state.askQuestion });
};

const adminContract = "admin.dev-support.near";
const admins = Near.view(adminContract, "get_admins", {});

return (
  <div class="container py-3 mb-5">
    {/* Title */}
    <Widget
      src="dmitriy_sheleg.near/widget/DevSupport.Discussion.Title"
      props={{ disabled: !context.accountId, onClick: toggleQuestion }}
    />
    {/* Widget to create the question */}
    <div class="my-3">
      {state.askQuestion && (
        <Widget src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Edit" />
      )}
    </div>
    {/* Widget to display Feed of Questions */}
    <Widget
      src="dmitriy_sheleg.near/widget/DevSupport.Feed"
      props={{ admins, adminContract: adminContract }}
    />
  </div>
);
