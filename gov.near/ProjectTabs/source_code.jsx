const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const project = props.project ?? Social.getr(`${accountId}/project`);

if (project === null) {
  return "Loading...";
}

const description = project.description;

State.init({
  loadBlog: false,
  loadTasks: false,
});

return (
  <>
    <ul className="nav nav-pills nav-fill mb-4" id="pills-tab" role="tablist">
      <li className="nav-item" role="presentation">
        <button
          className="nav-link active"
          id="pills-about-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-about"
          type="button"
          role="tab"
          aria-controls="pills-about"
          aria-selected="true"
        >
          About
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className="nav-link"
          id="pills-blog-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-blog"
          type="button"
          role="tab"
          aria-controls="pills-blog"
          aria-selected="false"
          onClick={() => {
            !state.loadBlog && State.update({ loadBlog: true });
          }}
        >
          Blog
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
        id="pills-about"
        role="tabpanel"
        aria-labelledby="pills-about-tab"
      >
        <Markdown text={description} />
      </div>
      <div
        className="tab-pane fade blog"
        id="pills-blog"
        role="tabpanel"
        aria-labelledby="pills-blog-tab"
      >
        {state.loadBlog && (
          <Widget src="gov.near/widget/BlogEntry" props={{ accountId }} />
        )}
      </div>
      <div
        className="tab-pane fade tasks"
        id="pills-tasks"
        role="tabpanel"
        aria-labelledby="pills-tasks-tab"
      >
        {state.loadWidgets && (
          <Widget src="gov.near/widget/LastWidgets" props={{ accountId }} />
        )}
      </div>
    </div>
  </>
);
