if (context.loading) {
  return "";
}

// By default the form to ask a question is hidden
initState({ askQuestion: false });
const toggleQuestion = () => {
  State.update({ askQuestion: !state.askQuestion });
};

const daoId = "build.sputnik-dao.near";
const policy = Near.view(daoId, "get_policy", {});

if (policy === null) {
  return "";
}

const groups = policy.roles
  .filter((role) => role.kind.Group)
  .map((role) => ({
    name: role.name,
    members: role.kind.Group,
  }));

const admins = policy.roles
  .filter((role) => role.name === "council")
  .map((role) => {
    const group = role.kind.Group;

    return group;
  }); // take this out

// const sortByCategories = ["Newest", "Popular"];
// const filterByTopic = ["one", "two", "three"];

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
            props={{ admins, adminContract: adminContract }}
          />
        </div>
      </div>
    </div>
  </div>
);
