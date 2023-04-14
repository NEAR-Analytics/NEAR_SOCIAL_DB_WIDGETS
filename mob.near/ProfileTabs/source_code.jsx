const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

const description = profile.description;

const pills = [
  { id: "bio", title: "Bio" },
  { id: "posts", title: "Posts" },
  { id: "nft", title: "NFTs" },
  { id: "widget", title: "Widgets" },
];

return (
  <>
    <ul className="nav nav-pills nav-fill mb-4" id="pills-tab" role="tablist">
      {pills.map(({ id, title }, i) => (
        <li className="nav-item" role="presentation" key={i}>
          <button
            className={`nav-link ${i === 0 ? "active" : ""}`}
            id={`pills-${id}-tab`}
            data-bs-toggle="pill"
            data-bs-target={`#pills-${id}`}
            type="button"
            role="tab"
            aria-controls={`pills-${id}`}
            aria-selected={i === 0}
            onClick={() => {
              const key = `load${id}`;
              !state[key] && State.update({ [key]: true });
            }}
          >
            {title}
          </button>
        </li>
      ))}
    </ul>
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane fade show active"
        id="pills-bio"
        role="tabpanel"
        aria-labelledby="pills-bio-tab"
      >
        <Markdown text={description} />
      </div>
      <div
        className="tab-pane fade"
        id="pills-posts"
        role="tabpanel"
        aria-labelledby="pills-posts-tab"
      >
        {state.loadposts && (
          <div className="col-lg-6 mx-auto">
            <Widget
              src="mob.near/widget/MainPage.Feed"
              props={{ accounts: [accountId] }}
            />
          </div>
        )}
      </div>
      <div
        className="tab-pane fade"
        id="pills-nft"
        role="tabpanel"
        aria-labelledby="pills-nft-tab"
      >
        {state.loadnft && (
          <Widget src="mob.near/widget/YourNFTs" props={{ accountId }} />
        )}
      </div>
      <div
        className="tab-pane fade widget"
        id="pills-widget"
        role="tabpanel"
        aria-labelledby="pills-widget-tab"
      >
        {state.loadwidgets && (
          <Widget src="mob.near/widget/LastWidgets" props={{ accountId }} />
        )}
      </div>
    </div>
  </>
);
