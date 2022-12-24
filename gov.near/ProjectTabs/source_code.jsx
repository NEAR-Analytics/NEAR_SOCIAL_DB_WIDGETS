const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const project = props.project ?? Social.getr(`${accountId}/project`);

if (project === null) {
  return "Loading...";
}

const featuredWidget = project.featuredWidget;

return (
  <>
    <ul className="nav nav-pills nav-fill mb-4" id="pills-tab" role="tablist">
      <li className="nav-item" role="presentation">
        <button
          className="nav-link active"
          id="pills-widget-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-widget"
          type="button"
          role="tab"
          aria-controls="pills-widget"
          aria-selected="true"
        >
          Widget
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className="nav-link"
          id="pills-groups-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-groups"
          type="button"
          role="tab"
          aria-controls="pills-groups"
          aria-selected="false"
          onClick={() => {
            !state.loadGroups && State.update({ loadGroups: true });
          }}
        >
          Groups
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className="nav-link"
          id="pills-tasks-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-tasks"
          type="button"
          role="tab"
          aria-controls="pills-tasks"
          aria-selected="false"
          onClick={() => {
            !state.loadTasks && State.update({ loadTasks: true });
          }}
        >
          Tasks
        </button>
      </li>
    </ul>
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane fade in show active"
        id="pills-widget"
        role="tabpanel"
        aria-labelledby="pills-widget-tab"
      >
        <Widget src={featuredWidget} />
      </div>
      <div
        className="tab-pane fade groups"
        id="pills-groups"
        role="tabpanel"
        aria-labelledby="pills-groups-tab"
      >
        <Widget src="gov.near/widget/FollowTabs" props={{ accountId }} />
      </div>
      <div
        className="tab-pane fade tasks"
        id="pills-tasks"
        role="tabpanel"
        aria-labelledby="pills-tasks-tab"
      >
        <Widget src="gov.near/widget/Tasks" props={{ accountId }} />
      </div>
    </div>
  </>
);
