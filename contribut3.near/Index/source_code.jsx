const ownerId = "contribut3.near";

initState({
  search: "",
  content: props.content ?? "entities",
});

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
              href={`https://near.social/#/${ownerId}/widget/Index?content=entities`}
              role="button"
              target="_self"
            >
              <i className="bi-house-fill" />
              Entities
            </a>
          </li>
          <li className="nav-item ">
            <a
              className="nav-link active button"
              href={`https://near.social/#/${ownerId}/widget/Index?content=contributors`}
              role="button"
              target="_self"
            >
              <i className="bi-person-plus-fill" />
              Contributors
            </a>
          </li>
          <li className="nav-item ">
            <a
              className="nav-link active button"
              href={`https://near.social/#/${ownerId}/widget/Index?content=admin`}
              role="button"
              target="_self"
            >
              <i className="bi-person-plus-fill" />
              Manage Entities
            </a>
          </li>
          <li className="nav-item">
            <input
              type="text"
              value={state.search}
              placeholder="Search"
              onChange={(e) => State.update({ search: e.target.value })}
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const content = {
  entities: (
    <Widget
      src={`${ownerId}/widget/EntityList`}
      props={{ search: state.search }}
    />
  ),
  contributors: (
    <Widget
      src={`${ownerId}/widget/ContributorList`}
      props={{ search: state.search }}
    />
  ),
  admin: (
    <Widget
      src={`${ownerId}/widget/AdminList`}
      props={{ search: state.search }}
    />
  ),
}[state.content];

return (
  <div>
    {controls}
    {navbar}
    <div className="mt-2">{content}</div>{" "}
  </div>
);
