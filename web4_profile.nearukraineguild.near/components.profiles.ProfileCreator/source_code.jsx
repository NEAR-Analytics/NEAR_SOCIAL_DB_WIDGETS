/* INCLUDE: "common.jsx" */
const contractAccountId =
  props.contractAccountId ||
  (context.widgetSrc ?? "web4_profile.near").split("/", 1)[0];
const widgetAccountId =
  props.widgetAccountId ||
  (context.widgetSrc ?? "web4_profile.near").split("/", 1)[0];

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    contractAccountId: props.contractAccountId,
    widgetAccountId: props.widgetAccountId,
    referral: props.referral,
  };
  return (
    <Widget
      src={`${widgetAccountId}/widget/${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function href(widgetName, linkProps) {
  linkProps = { ...linkProps };
  if (props.contractAccountId) {
    linkProps.contractAccountId = props.contractAccountId;
  }
  if (props.widgetAccountId) {
    linkProps.widgetAccountId = props.widgetAccountId;
  }
  if (props.referral) {
    linkProps.referral = props.referral;
  }
  const linkPropsQuery = Object.entries(linkProps)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `#/${widgetAccountId}/widget/pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */

State.init({
  title: props.title ?? "",
  description: props.description ?? "",
  twitter: props.twitter ?? "",
  telegram: props.telegram ?? "",
  github: props.github ?? "",
  medium: props.medium ?? "",
  error: "",
});

// This must be outside onClick, because Near.view returns null at first, and when the view call finished, it returns true/false.
// If checking this inside onClick, it will give `null` and we cannot tell the result is true or false.
const grantNotify = Near.view("social.near", "is_write_permission_granted", {
  predecessor_id: contractAccountId,
  key: context.accountId + "/index/notify",
});
if (grantNotify === null) {
  return;
}

const getAccountAccessKeys = (account) => {
  return asyncFetch(props.rpcUrl, {
    method: "POST",
    headers: {
      ["Content-Type"]: "application/json",
      ["Accept"]: "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "view_access_key_list",
        finality: "final",
        account_id: account,
      },
    }),
  }).then((response) => {
    if (!response.body.result) {
      return [];
    }

    return response.body.result.keys;
  });
};

const keys = useCache(
  () => getAccountAccessKeys(context.accountId),
  "getAccountAccessKeys",
  { subscribe: true }
);

const onCreateClick = () => {
  State.update({ error: "" });

  if (!state.title) {
    return State.update({ error: `Title can't be empty` });
  }

  if (!state.description) {
    return State.update({ error: `Description can't be empty` });
  }

  const fullAccessKey = keys.find(
    (key) => key.access_key.permission === "FullAccess"
  );

  if (!fullAccessKey) {
    return State.update({
      error: `Couldn't find FullAccessKey pair within your account`,
    });
  }

  const data = {
    title: state.title,
    description: state.description,
    twitter: state.twitter,
    telegram: state.telegram,
    github: state.github,
    medium: state.medium,
  };

  Near.call(
    props.factoryContractId,
    "create_web4_little_link_page",
    {
      args: { data: data },
      pub_key: fullAccessKey.public_key,
    },
    Big(10).pow(12).mul(300), // 300TGas
    Big(10).pow(24).mul(2) // 2N
  );
};

return (
  <div className="card">
    <div className="card-header">Creating your own Little Link page</div>
    <div class="card-body">
      <div className="row">
        <div className="col-lg-6  mb-2">
          Title
          <input
            type="text"
            value={state.title}
            onChange={(event) => {
              State.update({ title: event.target.value });
            }}
          />
        </div>
        <div className="col-lg-12  mb-2">
          Description
          <textarea
            value={state.description}
            type="text"
            rows={2}
            className="form-control"
            onChange={(event) => {
              State.update({ description: event.target.value });
            }}
          />
        </div>
        <div className="col-lg-3  mb-2">
          GitHub
          <input
            type="text"
            value={state.github}
            placeholder="account"
            onChange={(event) => {
              State.update({ github: event.target.value });
            }}
          />
        </div>
        <div className="col-lg-3  mb-2">
          Twitter
          <input
            type="text"
            value={state.twitter}
            placeholder="account"
            onChange={(event) => {
              State.update({ twitter: event.target.value });
            }}
          />
        </div>
        <div className="col-lg-3  mb-2">
          Telegram
          <input
            type="text"
            placeholder="account"
            value={state.telegram}
            onChange={(event) => {
              State.update({ telegram: event.target.value });
            }}
          />
        </div>
        <div className="col-lg-3  mb-2">
          Medium
          <input
            type="text"
            placeholder="@account"
            value={state.medium}
            onChange={(event) => {
              State.update({ medium: event.target.value });
            }}
          />
        </div>
      </div>
      <a
        className="btn btn-outline-primary mb-2 mt-2 px-8 py-1"
        onClick={onCreateClick}
      >
        Create
      </a>
    </div>
    {state.error && (
      <div class="card-footer">
        <p style={{ color: "red" }}>{state.error}</p>
      </div>
    )}
  </div>
);
