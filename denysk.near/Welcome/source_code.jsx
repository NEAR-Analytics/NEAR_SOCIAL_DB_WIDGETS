return (
  <>
    <Widget src="mob.near/widget/ProfileOnboarding" />
    <Widget src="denysk.near/widget/PriceStats" />
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
        <Widget src="mob.near/widget/MainPage.Content" />
      </div>
      <div
        className="tab-pane d-lg-block col-lg-4"
        id="pills-explore"
        role="tabpanel"
        aria-labelledby="pills-explore-tab"
      >
        <div className="text-bg-light rounded-4 p-3 mb-3">
          <Widget src="mob.near/widget/Welcome.GetInvolved" />
        </div>
        {context.accountId && (
          <div className="text-bg-light rounded-4 p-3 mb-3">
            <Widget src="mob.near/widget/Welcome.Notifications" />
          </div>
        )}
        <div className="text-bg-light rounded-4 p-3 mb-3">
          <Widget src="mob.near/widget/Applications" />
        </div>
        <div className="text-bg-light rounded-4 p-3 mb-3">
          <Widget src="mob.near/widget/People" />
        </div>
        <div className="text-bg-light rounded-4 p-3 mb-3">
          <h5>Follow activity</h5>
          <Widget src="mob.near/widget/Welcome.FollowFeed" />
        </div>
        <div className="text-bg-light rounded-4 p-3 mb-3">
          <h5>Poke activity</h5>
          <Widget src="mob.near/widget/Welcome.PokeFeed" />
        </div>
      </div>
    </div>
  </>
);
