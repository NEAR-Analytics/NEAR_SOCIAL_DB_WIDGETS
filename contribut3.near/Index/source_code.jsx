const ownerId = "contribut3.near";

initState({
  search: "",
  content: props.content ?? "entities",
});

const isModerator = Near.view(
  ownerId,
  "check_is_moderator",
  { account_id: context.accountId },
  "final",
  true
);

const editorsFooter = props.isPreview ? null : (
  <div className="row" id={`accordion`}>
    <div
      className="collapse"
      id="collapseContributionRequestForm"
      data-bs-parent="#accordion"
    >
      <Widget src={`${ownerId}/widget/ContributionRequestForm`} />
    </div>
    <div
      className="collapse"
      id="collapseEntityForm"
      data-bs-parent="#accordion"
    >
      <Widget src={`${ownerId}/widget/EntityForm`} />
    </div>
    <div
      className="collapse"
      id="collapseModeratorForm"
      data-bs-parent="#accordion"
    >
      <Widget src={`${ownerId}/widget/ModeratorEntityForm`} />
    </div>
    <div
      className="collapse"
      id="collapseModeratorSetForm"
      data-bs-parent="#accordion"
    >
      <Widget src={`${ownerId}/widget/ModeratorSetForm`} />
    </div>
  </div>
);

const control = ({ formName, text }) => (
  <li className="nav-item">
    <a
      className="nav-link active"
      aria-current="page"
      href="#"
      data-bs-toggle="collapse"
      href={`#collapse${formName}Form`}
      role="button"
      aria-expanded="false"
      aria-controls={`collapse${formName}Form`}
    >
      <i className="bi-plus-circle" />
      {text}
    </a>
  </li>
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
            {control({
              formName: "ContributionRequest",
              text: "Request Contribution",
            })}
            {control({ formName: "Entity", text: "Create Entity" })}
            {!isModerator
              ? null
              : control({ formName: "Moderator", text: "Edit/Create Entity" })}
            {!isModerator
              ? null
              : control({ formName: "ModeratorSet", text: "Change moderator" })}
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
              onClick={() => State.update({ content: "entities" })}
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
              onClick={() => State.update({ content: "contributors" })}
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
              onClick={() => State.update({ content: "admin" })}
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
