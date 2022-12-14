const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

const description = profile.description;

State.init({
  loadNFT: false,
  loadWidgets: false,
  loadBadges: false,
});

return (
  <>
    <ul className="nav nav-pills nav-fill mb-4" id="pills-tab" role="tablist">
      <li className="nav-item" role="presentation">
        <button
          className="nav-link active"
          id="pills-bio-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-bio"
          type="button"
          role="tab"
          aria-controls="pills-bio"
          aria-selected="true"
        >
          Bio
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className="nav-link"
          id="pills-nft-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-nft"
          type="button"
          role="tab"
          aria-controls="pills-nft"
          aria-selected="false"
          onClick={() => {
            !state.loadNFT && State.update({ loadNFT: true });
          }}
        >
          NFTs
        </button>
      </li>

      <li className="nav-item" role="presentation">
        <button
          className="nav-link"
          id="pills-widget-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-widget"
          type="button"
          role="tab"
          aria-controls="pills-widget"
          aria-selected="false"
          onClick={() => {
            !state.loadWidgets && State.update({ loadWidgets: true });
          }}
        >
          Widgets
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className="nav-link"
          id="pills-nft-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-nft"
          type="button"
          role="tab"
          aria-controls="pills-nft"
          aria-selected="false"
          onClick={() => {
            !state.loadBadges && State.update({ loadBadges: true });
          }}
        >
          Badges
        </button>
      </li>
    </ul>
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane fade in show active"
        id="pills-bio"
        role="tabpanel"
        aria-labelledby="pills-bio-tab"
      >
        <Markdown text={description} />
      </div>
      <div
        className="tab-pane fade nft"
        id="pills-nft"
        role="tabpanel"
        aria-labelledby="pills-nft-tab"
      >
        {state.loadNFT && (
          <Widget src="mob.near/widget/YourNFTs" props={{ accountId }} />
        )}
      </div>
      <div
        className="tab-pane fade widget"
        id="pills-widget"
        role="tabpanel"
        aria-labelledby="pills-widget-tab"
      >
        {state.loadWidgets && (
          <Widget src="mob.near/widget/LastWidgets" props={{ accountId }} />
        )}
      </div>
      <div
        className="tab-pane fade widget"
        id="pills-widget"
        role="tabpanel"
        aria-labelledby="pills-widget-tab"
      >
        {state.loadBadges && (
          <Widget src="oztanmain.near/widget/Badges" props={{ accountId }} />
        )}
      </div>
    </div>
  </>
);
