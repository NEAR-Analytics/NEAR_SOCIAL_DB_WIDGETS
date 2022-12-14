const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const books = props.books ?? Social.getr(`${accountId}/profile/books`);

if (books === null) {
  return "Loading";
}

State.init({
  loadFeed: false,
  loadMyBooks: false,
  loadWantToRead: false,
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
            !state.loadFeed && State.update({ loadFeed: true });
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
            !state.loadMyBooks && State.update({ loadMyBooks: true });
          }}
        >
          My Books
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
            !state.loadWantToRead && State.update({ loadWantToRead: true });
          }}
        >
          Want To Read
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
        {state.loadFeed && (
          <Widget src="mob.near/widget/YourNFTs" props={{ accountId }} />
        )}
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
        {state.loadWantToRead && (
          <Widget src="mob.near/widget/LastWidgets" props={{ accountId }} />
        )}
      </div>
    </div>
  </>
);
