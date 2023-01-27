initState({
  entryId: props.entryId ?? "",
  trusted: props.trusted ?? false,
});

const isAuthority = Near.view(
  "v3rify.near",
  "check_if_authority",
  { account_id: context.accountId },
  "final",
  true
);

return (
  <div className="card">
    <div className="card-body">
      <label htmlFor="entry_id">Entry ID:</label>
      <input
        type="text"
        id="entry_id"
        placeholder="near.org"
        value={state.entryId}
        onChange={(e) => State.update({ entryId: e.target.value })}
      />

      <div className="form-check mt-2">
        <label htmlFor="trust" className="form-check-label">
          Trusted
        </label>
        <input
          type="checkbox"
          className="form-check-input"
          checked={state.trusted}
          onChange={(e) => State.update({ trusted: e.target.checked })}
        />
      </div>

      <a
        role="button"
        className="btn btn-primary mt-2"
        onClick={() =>
          Near.call("v3rify.near", "submit_verification", {
            entry_id: state.entryId,
            trusted: state.trusted,
          })
        }
      >
        Submit
      </a>

      {!isAuthority ? null : (
        <a
          role="button"
          className="btn btn-info mt-2"
          onClick={() =>
            Near.call("v3rify.near", "pin_verification", {
              entry_id: state.entryId,
              trusted: state.trusted,
            })
          }
        >
          Pin
        </a>
      )}
    </div>
  </div>
);
