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

const H1 = styled.h1`
  color: #11181C;
  font-size: 32px;
  font-weight: 600;
`;
const H6 = styled.h6`
  color: #687076;
  font-size: 20px;
  font-weight: 400
`;
const Button = styled.button`
  display: block;
  color: #09342E;
  background-color: #30A46C;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 24px;
  border: none;
  border-radius: 50px;
`;

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
      src="ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Feed"
      props={{ admins, adminContract: adminContract }}
    />
  </div>
);
