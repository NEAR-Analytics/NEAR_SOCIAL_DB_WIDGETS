const accountId = context.accountId;

const defaultPage = "hack.near/widget/StartHere";

const page = Social.get(`${accountId}/settings/near.social/page`);

if (page === null) {
  return "Loading";
}

State.init({
  page: page ?? defaultPage,
});

const resetPage = () => {
  state.page = defaultPage;
  State.update();
};

return (
  <div>
    <div className="mb-2">
      <h4>Edit Your Page</h4>
      <p className="mb-2">Default widget path:</p>
      <input type="text" value={state.page} placeholder={defaultPage} />
    </div>
    <div className="mb-2">
      <CommitButton
        data={{ settings: { "near.social": { page: state.page } } }}
      >
        Save Your Page
      </CommitButton>
      {state.page !== defaultPage && (
        <button className="btn btn-outline-primary ms-2" onClick={resetPage}>
          Reset
        </button>
      )}
      {page === state.page && (
        <a className="btn btn-outline-primary ms-2" href={`#/`}>
          Open
        </a>
      )}
    </div>
    <hr />
    <div className="mb-2">
      <Widget src={state.page} props={{ accountId }} />
    </div>
  </div>
);
