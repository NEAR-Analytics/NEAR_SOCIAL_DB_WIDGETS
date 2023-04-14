const ownerId = "hack.near";
const curatedComps = [
  {
    category: "General",
    id: "general",
    icon: "bi-menu-button-wide-fill",
    components: [
      {
        accountId: "hack.near",
        widgetName: "MultiDAO",
      },
      {
        accountId: "hack.near",
        widgetName: "GroupCheck",
      },
      {
        accountId: "hack.near",
        widgetName: "CreateDAO",
      },
    ],
  },
  {
    category: "DAO Search",
    icon: "bi-search",
    id: "search",
    components: [
      {
        accountId: "onboarder.near",
        widgetName: "DAOSocialSearch",
      },
    ],
  },
  {
    category: "Membership",
    id: "buttons",
    icon: "bi-person-badge",
    components: [
      {
        accountId: "hack.near",
        widgetName: "AddMemberToRole",
      },
      {
        accountId: "hack.near",
        widgetName: "RemoveMemberFromRole",
      },
      {
        accountId: "hack.near",
        widgetName: "DAOs",
      },
      {
        accountId: "hack.near",
        widgetName: "DAO",
      },
      {
        accountId: "hack.near",
        widgetName: "Groups",
      },
      {
        accountId: "hack.near",
        widgetName: "GroupMembers",
      },
    ],
  },
  {
    category: "Transfers",
    id: "transfer",
    icon: "bi-safe",
    components: [
      {
        accountId: "hack.near",
        widgetName: "TransferProposal",
      },
      {
        accountId: "nearweekapp.near",
        widgetName: "Easy-DAO-Payout-Proposal",
      },
    ],
  },
  {
    category: "Polls",
    id: "poll",
    icon: "bi-check2-square",
    components: [
      {
        accountId: "hack.near",
        widgetName: "CreatePoll",
      },
      {
        accountId: "easypoll.near",
        widgetName: "EasyPoll",
      },
    ],
  },
  {
    category: "Functions",
    id: "functions",
    icon: "bi-arrows-move",
    components: [
      { accountId: "hack.near", widgetName: "FunctionCallProposal" },
    ],
  },
  {
    category: "Metadata",
    id: "metadata",
    icon: "bi-box-seam",
    components: [
      { accountId: "mob.near", widgetName: "MetadataEditor" },
      { accountId: "gov.near", widgetName: "ProjectEditor" },
    ],
  },
  {
    category: "DAO Tools",
    id: "tools",
    icon: "bi-tools",
    components: [
      { accountId: "hack.near", widgetName: "PullRequest" },
      { accountId: "hack.near", widgetName: "GetDAOPolicy" },
      { accountId: "hack.near", widgetName: "BufferZone" },
    ],
  },
];
const filterTag = props.commonComponentTag ?? "dao";
const debug = props.debug ?? false;

const searchComponents = () => {
  return (
    <div class="mb-4">
      <div className="mb-2">
        <Widget
          src="mob.near/widget/ComponentSearch"
          props={{
            debug: debug,
            filterTag: filterTag,
            placeholder: "🔍 Search for common DAO components",
            limit: 24,
            onChange: ({ result }) => {
              State.update({ components: result });
            },
          }}
        />
      </div>
      {state.components && (
        <div className="mb-2">
          {state.components.map((comp, i) => (
            <div class="mb-2" key={i}>
              <Widget
                src="mob.near/widget/WidgetMetadata"
                props={{
                  accountId: comp.accountId,
                  widgetName: comp.widgetName,
                  expanded: false,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const renderCategory = (categoryId) => {
  if (!categoryId || categoryId === "") return <></>;
  const item = curatedComps.find((i) => i.id == categoryId);
  return (
    <div class="mt-3">
      <div class="text fs-5 text-muted mb-1" id={item.id}>
        {item.category}
      </div>
      <div class="border border-2 mb-4 rounded"></div>
      <div class="container">
        <div className="row ">
          {item.components.map((comp, i) => (
            <div class="col-6 mb-2">
              <Widget
                key={i}
                src="mob.near/widget/WidgetMetadata"
                props={{
                  accountId: comp.accountId,
                  widgetName: comp.widgetName,
                  expanded: false,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
State.init({
  tab: "home",
  id: "",
});

const renderHome = () => {
  return <Widget src={`${ownerId}/widget/Components`} />;
};

const onSelect = (selection) => {
  State.update({ tab: selection.tab, id: selection.id ? selection.id : "" });
};

const renderContent = {
  home: renderHome(),
  searchComponents: searchComponents(),
  category: renderCategory(state.id),
}[state.tab];

return (
  <>
    <div class="row">
      <div class="col-md-3">
        <Widget
          src={`${ownerId}/widget/Common.DAO.Library.Navbar`}
          props={{
            tab: state.tab,
            onSelect,
            navItems: curatedComps.map((i) => ({
              category: i.category,
              icon: i.icon,
              id: i.id,
            })),
          }}
        />
        <hr className="border-2" />
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{ authors: [ownerId], dep: true }}
        />
      </div>
      <div class="col-md-9">
        {" "}
        <h2>Libraries</h2>
        <p class="text text-muted">
          Collections of building blocks for on-chain user interfaces.
        </p>
        {renderContent}
      </div>
    </div>
  </>
);
