const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "Please log in with NEAR";
}

const profile = props.profile;

const project = props.project ?? Social.getr(`${accountId}/project`);

if (project === null) {
  return "Loading...";
}

const featuredWidget = project.featuredWidget;

State.init({
  loadGroups: false,
  loadComments: false,
});

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
).body;

const css = fetch(
  "https://raw.githubusercontent.com/cryptosynk/near-social-profile/main/css/mainLight.css"
).body;

const theme = "light";

const Theme = styled.div`
  font-family: "Open Sans", sans-serif;
  ${cssFont}
  ${css}
`;

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
    </ul>
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane fade in show active"
        id="pills-widget"
        role="tabpanel"
        aria-labelledby="pills-widget-tab"
      >
        <Theme>
          <div className="container">
            <div className="content">
              <Widget
                src="zahidulislam.near/widget/Profile.RightSection"
                props={{ accountId, profile, theme }}
              />
            </div>
          </div>
        </Theme>
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
        className="tab-pane fade comments"
        id="pills-comments"
        role="tabpanel"
        aria-labelledby="pills-comments-tab"
      >
        <Widget src="gov.near/widget/Comments" props={{ accountId }} />
      </div>
    </div>
  </>
);
