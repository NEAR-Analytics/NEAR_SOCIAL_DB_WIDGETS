if (context.loading) {
  return "";
}

// By default the form to ask a question is hidden
initState({ askQuestion: false });
const toggleQuestion = () => {
  State.update({ askQuestion: !state.askQuestion });
};

// const sortByCategories = ["Newest", "Popular"];
// const filterByTopic = ["one", "two", "three"];

const labelFilter = props.labelFilter; // should null check, this is intended to be passed to features and filter based on amount per label
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
        <div class="pb-3 border-bottom">
          <Widget
            src="minorityprogrammers.near/widget/canny.header"
            props={{ disabled: !context.accountId, onClick: toggleQuestion }}
          />
        </div>

        {state.askQuestion && (
          <div class="mt-4 p-2">
            <Widget
              src="minorityprogrammers.near/widget/canny.post"
              props={{ onCommit: () => State.update({ askQuestion: false }) }}
            />
          </div>
        )}

        <div class="mt-5">
          <Widget
            src="minorityprogrammers.near/widget/canny.features"
            props={{ admins, adminContract: adminContract, labelFilter }}
          />
        </div>
      </div>
    </div>
  </div>
);
