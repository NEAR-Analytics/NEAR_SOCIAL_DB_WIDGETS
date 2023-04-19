const ownerId = "contribut3.near";

const availableContent = ["projects", "requests", "proposals", "contracts", "applications"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "projects";
  }

  return content;
};

const Header = styled.div`
  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 2em;
    color: #101828;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 1em;
    line-height: 1.5em;
    color: #475467;
  }
`;

const header = (
  <Header>
    <h1>Manage projects and requests</h1>
    <p>
      Create or edit projects and requests
    </p>
  </Header>
);

const contentSelector = (
  <Widget
    src={`${ownerId}/widget/TabSelector`}
    props={{
      tab: "manage",
      content: getContent(props.content),
      search: props.search,
      update: props.update,
      buttons: [
        {
          id: "projects",
          text: "Projects",
        },
        {
          id: "requests",
          text: "Requests",
        },
        {
          id: "proposals",
          text: "Proposals",
        },
        {
          id: "contracts",
          text: "Contracts",
        },
        {
          id: "applications",
          text: "Applications",
        },
      ],
    }}
  />
);

const content = {
  projects: (
    <Widget
      src={`${ownerId}/widget/Project.AdminList`}
      props={{ search: props.search, update: props.update }}
    />
  ),
  requests: (
    <Widget
      src={`${ownerId}/widget/Request.AdminList`}
      props={{ search: props.search, update: props.update }}
    />
  ),
  proposals: (
    <Widget
      src={`${ownerId}/widget/Proposal.AdminList`}
      props={{ search: props.search, update: props.update }}
    />
  ),
  contracts: (
    <Widget
      src={`${ownerId}/widget/Contract.AdminList`}
      props={{ search: props.search, update: props.update }}
    />
  ),
  applications: (
    <Widget
      src={`${ownerId}/widget/Project.AdminApplicationList`}
      props={{ search: props.search, update: props.update }}
    />
  ),
}[getContent(props.content)];

return (
  <div>
    <div className="mb-3 px-3">
      <div className="d-flex flex-row justify-content-between mb-3">
        {header}
      </div>
      <div className="d-flex flex-row justify-content-between">
        {contentSelector}
        <Widget
          src={`${ownerId}/widget/SearchInput`}
          props={{ search: props.search, update: props.update }}
        />
      </div>
    </div>
    <div className="px-3 pt-3">
      {context.accountId
        ? content
        : "You need to be logged in to view this page!"}
    </div>
  </div>
);
