let accountId = context.accountId;
if (!accountId) {
  return "Please login to add pool details";
}

const badgeOwners = Social.get(
  `pool-details.near/badge/staking-pool-owner/holder/**/`,
  "final"
);
if (!badgeOwners) {
  return "Loading";
}

let badges = [];
Object.entries(badgeOwners).forEach((item) => {
  badges[item[1]] = item[0];
});

initState({
  poolId: props.poolId ?? "",
  field: "description",
  fieldHint: "",
  value: "",
  ownerId: "",
  fields: {},
  social: {},
  badgeOwner: "",
});

const updatePool = (poolId) => {
  poolId = poolId.toLowerCase();

  if (poolId.indexOf(".near", poolId.length - 5) !== -1) {
    let ownerId = Near.view(poolId, "get_owner_id", {});
    let fields = Near.view("pool-details.near", "get_fields_by_pool", {
      pool_id: poolId,
    });
    const social = Social.get(`pool-details.near/${poolId}/**/`, "final");

    State.update({
      ownerId: ownerId ?? "",
      poolId,
      fields: fields ?? {},
      social: social ?? {},
      badgeOwner: badges[poolId] ?? "",
    });
  } else {
    State.update({
      ownerId: "",
      poolId,
      fields: fields ?? {},
      social: social ?? {},
      badgeOwner: "",
    });
  }
};

const updateField = (field) => {
  let fieldHint = "";
  if (field == "country_code") {
    fieldHint = (
      <span>
        List of valid{" "}
        <a href={"https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2"}>
          country codes
        </a>
      </span>
    );
  } else if (["url", "logo", "discord"].includes(field)) {
    fieldHint = "Full url with http:// or https://";
  } else if (["github", "telegram", "twitter"].includes(field)) {
    fieldHint = "Just handler, without full url";
  } else if (field == "other") {
    fieldHint = (
      <span>
        Use NEAR CLI to add any other value,{" "}
        <a href={"https://github.com/zavodil/near-pool-details"}>
          documnetation
        </a>
      </span>
    );
  }
  State.update({ fieldHint, field });
};

const onSetNearSocialBadge = () => {
  const gas = 300 * 1000000000000;
  let deposit = "50000000000000000000000";

  Near.call(
    "pool-details.near",
    "set_near_social_badge",
    { pool_id: state.poolId },
    gas,
    deposit
  );
};

const onSubmitClick = () => {
  const gas = 300 * 1000000000000;

  Near.call(
    "pool-details.near",
    "update_field",
    { pool_id: state.poolId, name: state.field, value: state.value },
    gas
  );
};

const fieldsStringified = `
\`\`\`json
${JSON.stringify(state.fields, undefined, 2)}
\`\`\`
`;
const socialStringified = `
\`\`\`json
${JSON.stringify(state.social, undefined, 2)}
\`\`\`
`;

const onExportClick = () => {
  const gas = 300 * 1000000000000;
  let deposit = "50000000000000000000000";
  Near.call(
    "pool-details.near",
    "export_to_near_social",
    { pool_id: state.poolId },
    gas,
    deposit
  );
};

return (
  <div class="mb-4">
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

    <p>
      Pool:{" "}
      <input
        value={state.poolId}
        placeholder="zavodil.poolv1.near"
        onChange={(e) => updatePool(e.target.value)}
      />
    </p>
    <p>
      Field:
      <select
        class="form-select"
        aria-label="description"
        value={state.field}
        onChange={(e) => updateField(e.target.value)}
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
        <option value="other">Other</option>
      </select>
    </p>
    {state.fieldHint && (
      <div class="alert alert-warning" role="alert">
        {state.fieldHint}.
      </div>
    )}
    <p>
      Value:
      <input
        disabled={state.field == "other"}
        value={state.value}
        placeholder="Value"
        onChange={(e) => State.update({ value: e.target.value })}
      />
    </p>

    <div>
      <button
        disabled={
          context.loading ||
          !(state.value && state.field && state.poolId) ||
          !state.ownerId ||
          state.field == "other"
        }
        className={`btn ${
          context.loading ? "btn-outline-dark" : "btn-primary"
        }`}
        onClick={onSubmitClick}
      >
        Submit
      </button>

      <button
        disabled={context.loading || !state.ownerId}
        className={`btn ${
          context.loading ? "btn-outline-dark" : "btn-primary"
        }`}
        onClick={onExportClick}
      >
        Export pool data to NEAR.Social
      </button>
    </div>

    {state.ownerId && (
      <>
        <div class="alert alert-success mt-3" role="alert">
          Please sign transaction with account <strong>{state.ownerId}</strong>{" "}
          to update pool <strong>{state.poolId}</strong>.
        </div>

        <div class="pt-4">
          <div>Current pool details:</div>
          <Markdown text={fieldsStringified} />
        </div>

        <div class="mt-2">
          <div>Current Near.Social data:</div>
          <Markdown text={socialStringified} />
        </div>
      </>
    )}

    {state.badgeOwner && (
      <div class="mt-6">
        <div>
          <span className="badge bg-secondary fs-6">staking-pool-owner</span>{" "}
          badge owner of <strong>{state.poolId}</strong>:
          <Widget
            src={"zavodil.near/widget/ProfileLine"}
            props={{ accountId: state.badgeOwner }}
          />
        </div>
      </div>
    )}

    {state.poolId && state.ownerId && !state.badgeOwner && (
      <div class="mt-6 mb-3">
        <div>
          <button
            className={`btn ${
              context.loading ? "btn-outline-dark" : "btn-primary"
            }`}
            onClick={onSetNearSocialBadge}
          >
            Create Near Social Badge for {state.ownerId}
          </button>
        </div>
      </div>
    )}
  </div>
);
