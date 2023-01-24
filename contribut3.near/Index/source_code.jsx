const ownerId = "contribut3.near";

initState({
  search: "",
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
  });
};

const editorsFooter = props.isPreview ? null : (
  <div class="row" id={`accordion`}>
    <div
      class="collapse"
      id={`collapseContributionRequestForm`}
      data-bs-parent={`#accordion`}
    >
      <Widget src={`contribut3.near/widget/ContributionRequestForm`} />
    </div>
    <div
      class="collapse"
      id={`collapseEntityForm`}
      data-bs-parent={`#accordion`}
    >
      <Widget src={`${ownerId}/widget/EntityForm`} />
    </div>
  </div>
);

const controls = (
  <div class="card border-secondary mb-2">
    <div class="nav navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <div class="navbar-brand">
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
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                href="#"
                data-bs-toggle="collapse"
                href={`#collapseContributionRequestForm`}
                role="button"
                aria-expanded="false"
                aria-controls={`collapseContributionRequestForm`}
              >
                <i class="bi-plus-circle"> </i>
                Request Contribution
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link active"
                href="#"
                data-bs-toggle="collapse"
                href={`#collapseEntityForm`}
                role="button"
                aria-expanded="false"
                aria-controls={`collapseEntityForm`}
              >
                <i class="bi-rocket-fill"> </i>
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
  <div class="card border-secondary">
    <div class="nav navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item ">
            <a
              class="nav-link active button"
              onClick={onHomeClick}
              role="button"
            >
              <i class="bi-house-fill"> </i>
              Entities
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

return (
  <div>
    {controls}
    {navbar}
    <div class="mt-2">
      <Widget src={`${ownerId}/widget/EntityList`} />
    </div>
  </div>
);
