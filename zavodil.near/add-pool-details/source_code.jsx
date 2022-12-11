let accountId = context.accountId;
if (!accountId) {
  return "Please login to add pool details";
}

initState({ poolId: "", field: "description", value: "" });

const onSubmitClick = () => {
  const gas = 300 * 1000000000000;

  Near.call(
    "pool-details.near",
    "update_field",
    { pool_id: state.poolId, name: state.field, value: state.value },
    gas
  );
};

return (
  <div>
    <h1>
      Add Pool Details{" "}
      <a href="/#/zavodil.near/widget/StakingPools" target="_blank">
        <span className="badge bg-secondary fs-6 align-middle">All Pools</span>
      </a>
    </h1>
    <p>Add details about your whitelisted staking pool on NEAR blockchain.</p>
    <p>
      Data stored on a <span class="badge bg-secondary">pool-details.near</span>{" "}
      account.{" "}
      <a href="https://github.com/zavodil/near-pool-details">
        Smart contract github.
      </a>
    </p>

    {state.poolId}

    <p>
      Pool:{" "}
      <input
        value={state.poolId}
        placeholder="zavodil.poolv1.near"
        onChange={(e) => State.update({ poolId: e.target.value })}
      />
    </p>
    <p>
      Field:
      <select
        class="form-select"
        aria-label="description"
        value={state.field}
        onChange={(e) => State.update({ field: e.target.value })}
      >
        <option value="name">Project name</option>
        <option value="description">Description</option>
        <option value="logo">Logo url</option>
        <option value="country_code">Country code</option>
        <option value="url">Website URL</option>
        <option value="twitter">Twitter handler</option>
        <option value="discord">Discord</option>
        <option value="github">Github account</option>
        <option value="telegram">Telegram account</option>
        <option value="email">Email</option>
      </select>
    </p>
    <p>
      Value:
      <input
        value={state.value}
        placeholder="Value"
        onChange={(e) => State.update({ value: e.target.value })}
      />
    </p>
    <button
      disabled={
        context.loading || !(state.value && state.field && state.poolId)
      }
      className={`btn ${context.loading ? "btn-outline-dark" : "btn-primary"}`}
      onClick={onSubmitClick}
    >
      Submit
    </button>
  </div>
);
