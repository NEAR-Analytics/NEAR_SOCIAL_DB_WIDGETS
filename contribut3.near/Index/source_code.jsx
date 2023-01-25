const ownerId = "contribut3.near";

initState({
  search: "",
  content: props.content ?? "entities",
});

// // A workaround for weird VM behavior. It does not call initState when the same
// // widget is reopened in the same tab.
// if (state.selectedPost != props.postId) {
//   State.update({ selectedPost: props.postId });
// }
// if (state.label != props.label) {
//   State.update({ label: props.label });
// }

const home = "https://near.social/#/contribut3.near/widget/Index";

const onHomeClick = () => {
  State.update({
    search: "",
    content: "entities",
  });
};

const editorsFooter = props.isPreview ? null : (
  <div className="row" id={`accordion`}>
    <div
      className="collapse"
      id={`collapseContributionRequestForm`}
      data-bs-parent={`#accordion`}
    >
      <Widget src={`contribut3.near/widget/ContributionRequestForm`} />
    </div>
    <div
      className="collapse"
      id={`collapseEntityForm`}
      data-bs-parent={`#accordion`}
    >
      <Widget src={`${ownerId}/widget/EntityForm`} />
    </div>
  </div>
);

const controls = (
  <div className="card border-secondary mb-2">
    <div className="nav navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-brand">
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              metadata,
              accountId,
              widgetName,
              style: { height: "2.5em", width: "2.5em", minWidth: "2.5em" },
              className: "me-2",
            }}
          />
        </div>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="#"
                data-bs-toggle="collapse"
                href={`#collapseContributionRequestForm`}
                role="button"
                aria-expanded="false"
                aria-controls={`collapseContributionRequestForm`}
              >
                <i className="bi-plus-circle"> </i>
                Request Contribution
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                href="#"
                data-bs-toggle="collapse"
                href={`#collapseEntityForm`}
                role="button"
                aria-expanded="false"
                aria-controls={`collapseEntityForm`}
              >
                <i className="bi-rocket-fill"> </i>
                Create Entity
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    {editorsFooter}
  </div>
);

const navbar = (
  <div className="card border-secondary">
    <div className="nav navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item ">
            <a
              className="nav-link active button"
              onClick={onHomeClick}
              role="button"
            >
              <i className="bi-house-fill"> </i>
              Entities
            </a>
          </li>
          <li className="nav-item ">
            <a
              className="nav-link active button"
              onClick={() => State.update({ content: "contributors" })}
              role="button"
            >
              <i className="bi-person-plus-fill"> </i>
              Contributors
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const content = {
  entities: (
    <div className="mt-2">
      <Widget src={`${ownerId}/widget/EntityList`} />
    </div>
  ),
  contributors: (
    <div className="mt-2">
      <Widget src={`${ownerId}/widget/ContributorList`} />
    </div>
  ),
}[state.content];

return (
  <div>
    {controls}
    {navbar}
    {content}
  </div>
);
