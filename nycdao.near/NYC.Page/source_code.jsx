const hashtag = props.hashtag ?? "nyc";

return (
  <>
    <Widget src="nycdao.near/widget/CommunityOnboarding" />
    <ul
      className="nav nav-pills nav-fill mb-3 d-lg-none"
      id="pills-tab"
      role="tablist"
    >
      <li className="nav-item" role="presentation">
        <button
          className="nav-link active"
          id="pills-content-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-content"
          type="button"
          role="tab"
          aria-controls="pills-content"
          aria-selected="true"
        >
          Content
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
        id="pills-content"
        role="tabpanel"
        aria-labelledby="pills-content-tab"
      >
        <Widget src="nycdao.near/widget/NYC.Page.Content" props={props} />
      </div>
      <div
        className="tab-pane d-lg-block col-lg-4"
        id="pills-explore"
        role="tabpanel"
        aria-labelledby="pills-explore-tab"
      >
        <Widget src="nycdao.near/widget/NYC.Page.Menu" props={props} />
      </div>
    </div>
  </>
);
