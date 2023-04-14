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

const sortByCategories = ["Newest", "Popular"];
const filterByTopic = ["one", "two", "three"];

const SidebarWrapper = styled.div`
  border-right: 1px solid #ECEEF0;
`;

return (
  <div class="container-fluid py-3 mb-5">
    <div class="row">
      {/**
    <SidebarWrapper className="col-2 pe-5">
        <Widget
          src="dima_sheleg.near/widget/DevSupport.Main.Sidebar"
          props={{ categories: sortByCategories, topics: filterByTopic }}
        />
      </SidebarWrapper>
    */}

      <div class="col-12">
        <Widget
          src="dima_sheleg.near/widget/DevSupport.Discussion.Title"
          props={{ disabled: !context.accountId, onClick: toggleQuestion }}
        />
        {/* Widget to create the question */}
        <div class="my-3">
          {state.askQuestion && (
            <Widget src="dima_sheleg.near/widget/DevSupport.Question.Edit" />
          )}
        </div>
        {/* Widget to display Feed of Questions */}
        <Widget
          src="dima_sheleg.near/widget/DevSupport.Feed"
          props={{ admins, adminContract: adminContract }}
        />
      </div>
    </div>
  </div>
);
