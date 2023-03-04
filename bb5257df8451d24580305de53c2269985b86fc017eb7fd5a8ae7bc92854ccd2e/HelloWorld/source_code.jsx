State.init({ accountId: "" });

return (
  <input
    type="text"
    className="form-control"
    value={state.accountId}
    onChange={(e) => {
      const accountId = e.target.value
        .toLowerCase()
        .replace(/[^a-z0-9_.-]/g, "");
      State.update({ accountId });
    }}
  />
);
