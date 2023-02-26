/**
 * WelcomePlus
 * Source: mob.near/widget/Welcome
 */
const accountId = context.accountId;

const WidgetBlockList = (props) => {
  const accountId = context.accountId;
  if (!accountId) return;

  const profile = Social.getr(`${accountId}/profile`);
  console.log("Profile ", profile);

  if (profile === null) {
    return "Loading";
  }

  initState({
    profile: profile ?? {},
  });

  profile = {
    cdcBlockList: state.profile.cdcBlockList,
  };

  return (
    <>
      <div class="accordion mb-3" id="blocklist">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Block list
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="container">
              <div className="row mb-3">
                <div className="mb-2">
                  <small>
                    Enter user id (NEAR wallet), seperated by <strong>,</strong>
                  </small>
                  <input type="text" value={state.profile.cdcBlockList} />
                </div>

                <div className="mt-2">
                  <CommitButton data={{ profile }}>Block 🛑</CommitButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

return (
  <>
    <Widget src="mob.near/widget/ProfileOnboarding" />
    <ul
      className="nav nav-pills nav-fill mb-3 d-lg-none"
      id="pills-tab"
      role="tablist"
    >
      <li className="nav-item" role="presentation">
        <button
          className="nav-link active"
          id="pills-feed-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-feed"
          type="button"
          role="tab"
          aria-controls="pills-feed"
          aria-selected="true"
        >
          Feed
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className="nav-link"
          id="pills-explore-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-explore"
          type="button"
          role="tab"
          aria-controls="pills-explore"
          aria-selected="false"
        >
          Explore
        </button>
      </li>
    </ul>
    <div className="tab-content row p-0" id="pills-tabContent">
      <div
        className="tab-pane show active d-lg-block col-lg-8"
        id="pills-feed"
        role="tabpanel"
        aria-labelledby="pills-feed-tab"
      >
        <Widget src="cuongdcdev.near/widget/MainPage.ContentPlus" />
      </div>
      <div
        className="tab-pane d-lg-block col-lg-4"
        id="pills-explore"
        role="tabpanel"
        aria-labelledby="pills-explore-tab"
      >
        <Widget src="mob.near/widget/Welcome.RHS" />
        {WidgetBlockList()}
      </div>
    </div>
  </>
);
