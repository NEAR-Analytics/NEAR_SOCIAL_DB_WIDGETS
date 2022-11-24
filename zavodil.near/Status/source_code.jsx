// Status
const appName = "memo";
let accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to set status";
}

State.init({ memo: null });

return (
  <div>
    <div className="mb-3">
      <label for="exampleFormControlTextarea1" className="form-label">
        What's happening?
      </label>
      <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        rows="2"
        style={{ maxWidth: "30em" }}
        onChange={(event) => State.update({ memo: event.target.value })}
      ></textarea>
    </div>

    <div>
      <CommitButton
        disabled={state.memo === null}
        data={{
          [appName]: {
            [accountId]: state.memo,
          },
        }}
      >
        Submit
      </CommitButton>
    </div>
  </div>
);
