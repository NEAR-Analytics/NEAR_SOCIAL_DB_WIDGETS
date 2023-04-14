const ownerId = "contribut3.near";

const availableContent = ["projects", "contributions", "requests"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "projects";
  }

  return content;
};

const header = (
  <div>
    <h1 className="fs-2">Manage</h1>
    <p className="fw-semibold fs-5 text-muted">
      Crete or edit projects, organizations and contribution requests
    </p>
  </div>
);

const contentSelector = (
  <Widget
    src={`${ownerId}/widget/TabSelector`}
    props={{
      tab: "entities",
      content: getContent(props.content),
      search: props.search,
      update: (content) => props.update({ content }),
      buttons: [
        {
          id: "contributions",
          text: "My Contributions",
          icon: "bi-person-up",
        },
        {
          id: "projects",
          text: "Projects",
          icon: "bi-boxes",
        },
        {
          id: "requests",
          text: "Requests",
          icon: "bi-ui-checks-grid",
        },
      ],
    }}
  />
);

const content = {
  projects: (
    <Widget
      src={`${ownerId}/widget/AdminList`}
      props={{ search: props.search, update: props.update }}
    />
  ),
  contributions: (
    <Widget
      src={`${ownerId}/widget/ContributionList`}
      props={{
        search: props.search,
        update: props.update,
        accountId: context.accountId,
        isEntity: false,
      }}
    />
  ),
  requests: (
    <Widget
      src={`${ownerId}/widget/NeedList`}
      props={{ search: props.search, update: props.update }}
    />
  ),
}[getContent(props.content)];

return (
  <div>
    <div className="mb-3 px-3">
      <div className="d-flex flex-row justify-content-between mb-3">
        {header}
        <Widget
          src={`${ownerId}/widget/CreateNewInput`}
          props={{ update: props.update }}
        />
      </div>
      <div className="d-flex flex-row justify-content-between">
        {contentSelector}
        <Widget
          src={`${ownerId}/widget/SearchInput`}
          props={{ search: props.search, update: props.update }}
        />
      </div>
    </div>
    <div className="px-3 pt-3">{content}</div>
  </div>
);
