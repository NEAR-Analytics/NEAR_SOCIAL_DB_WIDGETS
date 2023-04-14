return (
  <>
    <Widget src="y3k.near/widget/ProfileOnboarding" />
    <Widget src="y3k.near/widget/NEAR.ATLAS.MainPage.Charts" props={{}} />

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
      ></div>
      <div
        className="tab-pane d-lg-block col-lg-4"
        id="pills-explore"
        role="tabpanel"
        aria-labelledby="pills-explore-tab"
      ></div>
    </div>
  </>
);
