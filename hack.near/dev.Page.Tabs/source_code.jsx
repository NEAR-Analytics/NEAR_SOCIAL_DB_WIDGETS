const accountId = props.accountId ?? "hack.near";
const hashtag = props.hashtag ?? "builders";
if (!accountId) {
  return "No account ID";
}

const page = props.page ?? Social.getr(`${accountId}/dev/page`);

if (page === null) {
  return "Loading...";
}

const description = page.description;

const pills = [
  { id: "learn", title: "Learn" },
  { id: "build", title: "Build" },
  { id: "share", title: "Share" },
  { id: "connect", title: "Connect" },
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
    <div className="tab-learn" id="pills-tabLearn">
      <div
        className="tab-pane fade show active"
        id="pills-learn"
        role="tabpanel"
        aria-labelledby="pills-learn-tab"
      >
        <div className="mx-auto">
          <Widget
            src="hack.near/widget/dev.Page.Guide"
            props={{ accounts: [accountId] }}
          />
        </div>
      </div>
      <div
        className="tab-pane fade"
        id="pills-build"
        role="tabpanel"
        aria-labelledby="pills-build-tab"
      >
        <div className="mx-auto">
          <Widget src="hack.near/widget/DAO.Rewards" />
        </div>
      </div>
      <div
        className="tab-pane fade"
        id="pills-feed"
        role="tabpanel"
        aria-labelledby="pills-feed-tab"
      >
        <div className="mx-auto">
          <Widget src="efiz.near/widget/Community.Posts" props={{ hashtag }} />
        </div>
      </div>
      <div
        className="tab-pane fade"
        id="pills-about"
        role="tabpanel"
        aria-labelledby="pills-about-tab"
      >
        <div className="mx-auto">
          <div className="mx-auto">
            {description && (
              <div className="border rounded-4 p-3 pb-0 mb-3">
                <h4>
                  <i class="bi bi-pin-angle" /> Description
                </h4>
                <Markdown text={description} />
              </div>
            )}
          </div>
          <Widget src="hack.near/widget/DAO.Page.Sidebar" props={{ daoId }} />
        </div>
      </div>
    </div>
  </>
);
