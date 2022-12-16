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
  loadBooksFeed: true,
  loadBooksRead: false,
  loadBooksToRead: false,
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
          onClick={() => {
            !state.loadBooksFeed && State.update({ loadBooksFeed: true });
          }}
        >
          Feed
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
            !state.loadBooksRead && State.update({ loadBooksRead: true });
          }}
        >
          Read
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
            !state.loadBooksToRead && State.update({ loadBooksToRead: true });
          }}
        >
          Books To Read
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
        {state.loadBooksFeed && (
          <Widget
            src="chaotictempest.near/widget/BooksFeed"
            props={{ accountId }}
          />
        )}
      </div>
      <div
        className="tab-pane fade nft"
        id="pills-nft"
        role="tabpanel"
        aria-labelledby="pills-nft-tab"
      >
        {state.loadBooksRead && (
          <Widget src="serhii.near/widget/BooksRead" props={{ accountId }} />
        )}
      </div>
      <div
        className="tab-pane fade widget"
        id="pills-widget"
        role="tabpanel"
        aria-labelledby="pills-widget-tab"
      >
        {state.loadBooksToRead && (
          <Widget src="serhii.near/widget/BooksToRead" props={{ accountId }} />
        )}
      </div>
    </div>
  </>
);
