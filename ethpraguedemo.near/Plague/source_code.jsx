if (context.loading) {
  return "Loading";
}

// By default the form to ask a question is hidden
initState({ askQuestion: false });
const toggleQuestion = () => {
  window.location.href = "https://example.com/ABC"; // Replace 'https://example.com/ABC' with your desired URL
};

const adminContract = "admin.dev-support.near";
const admins = Near.view(adminContract, "get_admins", {});

// const sortByCategories = ["Newest", "Popular"];
// const filterByTopic = ["one", "two", "three"];

const SidebarWrapper = styled.div`
  border-right: 1px solid #ECEEF0;
`;

return (
  <div class="container-fluid py-6 mb-5">
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
        <div class="pb-3 border-bottom">
          <Widget
            src="dev-support.near/widget/DevSupport.Discussion.Title"
            props={{ disabled: !context.accountId, onClick: toggleQuestion }}
          />
        </div>

        {state.askQuestion && (
          <div class="mt-4 p-8">
            <Widget
              src="dev-support.near/widget/DevSupport.Question.Edit"
              props={{ onCommit: () => State.update({ askQuestion: false }) }}
            />
          </div>
        )}

        <div class="mt-5">
          <Widget
            src="dev-support.near/widget/DevSupport.Feed"
            props={{ admins, adminContract: adminContract }}
          />
        </div>
      </div>
    </div>
  </div>
);
