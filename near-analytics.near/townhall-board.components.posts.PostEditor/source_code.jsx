/* INCLUDE: "common.jsx" */
const nearNFDevsContractAccountId =
  props.nearNFDevsContractAccountId ||
  (context.widgetSrc ?? "near-analytics.near").split("/", 1)[0];

const nearNFDevsWidgetsAccountId =
  props.nearNFDevsWidgetsAccountId ||
  (context.widgetSrc ?? "near-analytics.near").split("/", 1)[0];

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    nearNFDevsContractAccountId: props.nearNFDevsContractAccountId,
    nearNFDevsWidgetsAccountId: props.nearNFDevsWidgetsAccountId,
    referral: props.referral,
  };

  return (
    <Widget
      src={`${nearNFDevsWidgetsAccountId}/widget/townhall-board.${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function href(widgetName, linkProps) {
  linkProps = { ...linkProps };

  if (props.nearNFDevsContractAccountId) {
    linkProps.nearNFDevsContractAccountId = props.nearNFDevsContractAccountId;
  }

  if (props.nearNFDevsWidgetsAccountId) {
    linkProps.nearNFDevsWidgetsAccountId = props.nearNFDevsWidgetsAccountId;
  }

  if (props.referral) {
    linkProps.referral = props.referral;
  }

  const linkPropsQuery = Object.entries(linkProps)
    .filter(([_key, nullable]) => (nullable ?? null) !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return `/#/${nearNFDevsWidgetsAccountId}/widget/townhall-board.pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */

const postType = props.postType ?? "Sponsorship";
const parentId = props.parentId ?? null;
const postId = props.postId ?? null;
const mode = props.mode ?? "Create";

const referralLabels = props.referral ? [`referral:${props.referral}`] : [];
const labelStrings = (props.labels ?? []).concat(referralLabels);
const labels = labelStrings.map((s) => {
  return { name: s };
});

initState({
  author_id: context.accountId,
  // Should be a list of objects with field "name".
  labels,
  // Should be a list of labels as strings.
  // Both of the label structures should be modified together.
  labelStrings,
  postType,
  name: props.name ?? "",
  description: props.description ?? "",
  amount: props.amount ?? "0",
  token: props.token ?? "Near",
  supervisor: props.supervisor ?? "",
  githubLink: props.githubLink ?? "",
  warning: "",
});

let fields = {
  Comment: ["description"],
  Idea: ["name", "description"],
  Submission: ["name", "description"],
  Attestation: ["name", "description"],
  Sponsorship: [
    "name",
    "description",
    "amount",
    "sponsorship_token",
    "supervisor",
  ],
  Github: ["githubLink", "name", "description"],
}[postType];

// This must be outside onClick, because Near.view returns null at first, and when the view call finished, it returns true/false.
// If checking this inside onClick, it will give `null` and we cannot tell the result is true or false.
let grantNotify = Near.view("social.near", "is_write_permission_granted", {
  predecessor_id: nearNFDevsContractAccountId,
  key: context.accountId + "/index/notify",
});
if (grantNotify === null) {
  return;
}
const onSubmit = () => {
  let labels = state.labelStrings;
  var body = {
    Comment: { description: state.description, comment_version: "V2" },
    Idea: {
      name: state.name,
      description: state.description,
      idea_version: "V1",
    },
    Submission: {
      name: state.name,
      description: state.description,
      submission_version: "V1",
    },
    Attestation: {
      name: state.name,
      description: state.description,
      attestation_version: "V1",
    },
    Sponsorship: {
      name: state.name,
      description: state.description,
      amount: state.amount,
      sponsorship_token: state.token,
      supervisor: state.supervisor,
      sponsorship_version: "V1",
    },
    Github: {
      name: state.name,
      description: state.description,
      github_version: "V0",
      github_link: state.githubLink,
    },
  }[postType];
  body["post_type"] = postType;
  if (!context.accountId) {
    return;
  }
  let txn = [];
  if (mode == "Create") {
    txn.push({
      contractName: nearNFDevsContractAccountId,
      methodName: "add_post",
      args: {
        parent_id: parentId,
        labels,
        body,
      },
      deposit: Big(10).pow(21).mul(2),
      gas: Big(10).pow(12).mul(100),
    });
  } else if (mode == "Edit") {
    txn.push({
      contractName: nearNFDevsContractAccountId,
      methodName: "edit_post",
      args: {
        id: postId,
        labels,
        body,
      },
      deposit: Big(10).pow(21).mul(2),
      gas: Big(10).pow(12).mul(100),
    });
  }
  if (mode == "Create" || mode == "Edit") {
    if (grantNotify === false) {
      txn.unshift({
        contractName: "social.near",
        methodName: "grant_write_permission",
        args: {
          predecessor_id: nearNFDevsContractAccountId,
          keys: [context.accountId + "/index/notify"],
        },
        deposit: Big(10).pow(23),
        gas: Big(10).pow(12).mul(30),
      });
    }
    Near.call(txn);
  }
};

const normalizeLabel = (label) =>
  label
    .replaceAll(/[- \.]/g, "_")
    .replaceAll(/[^\w]+/g, "")
    .replaceAll(/_+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase()
    .trim("-");

const checkLabel = (label) => {
  Near.asyncView(nearNFDevsContractAccountId, "is_allowed_to_use_labels", {
    editor: context.accountId,
    labels: [label],
  }).then((allowed) => {
    if (allowed) {
      State.update({ warning: "" });
    } else {
      State.update({
        warning:
          'The label "' +
          label +
          '" is protected and can only be added by moderators',
      });
      return;
    }
  });
};

const setLabels = (labels) => {
  labels = labels.map((o) => {
    o.name = normalizeLabel(o.name);
    return o;
  });
  if (labels.length < state.labels.length) {
    let oldLabels = new Set(state.labels.map((label) => label.name));
    for (let label of labels) {
      oldLabels.delete(label.name);
    }
    let removed = oldLabels.values().next().value;
    Near.asyncView(nearNFDevsContractAccountId, "is_allowed_to_use_labels", {
      editor: context.accountId,
      labels: [removed],
    }).then((allowed) => {
      if (allowed) {
        let labelStrings = labels.map(({ name }) => name);
        State.update({ labels, labelStrings });
      } else {
        State.update({
          warning:
            'The label "' +
            removed +
            '" is protected and can only be updated by moderators',
        });
        return;
      }
    });
  } else {
    let labelStrings = labels.map((o) => {
      return o.name;
    });
    State.update({ labels, labelStrings });
  }
};
const existingLabelStrings =
  Near.view(nearNFDevsContractAccountId, "get_all_allowed_labels", {
    editor: context.accountId,
  }) ?? [];
const existingLabelSet = new Set(existingLabelStrings);
const existingLabels = existingLabelStrings.map((s) => {
  return { name: s };
});

const labelEditor = (
  <div className="col-lg-12  mb-2">
    Labels:
    <Typeahead
      multiple
      labelKey="name"
      onInputChange={checkLabel}
      onChange={setLabels}
      options={existingLabels}
      placeholder="near.social, widget, NEP, standard, protocol, tool"
      selected={state.labels}
      positionFixed
      allowNew={(results, props) => {
        return (
          !existingLabelSet.has(props.text) &&
          props.selected.filter((selected) => selected.name === props.text)
            .length == 0 &&
          Near.view(nearNFDevsContractAccountId, "is_allowed_to_use_labels", {
            editor: context.accountId,
            labels: [props.text],
          })
        );
      }}
    />
  </div>
);

const githubLinkDiv = fields.includes("githubLink") ? (
  <div className="col-lg-12  mb-2">
    Github Issue URL:
    <input
      type="text"
      value={state.githubLink}
      onChange={(event) => State.update({ githubLink: event.target.value })}
    />
  </div>
) : null;

const nameDiv = fields.includes("name") ? (
  <div className="col-lg-6  mb-2">
    Title:
    <input
      type="text"
      value={state.name}
      onChange={(event) => State.update({ name: event.target.value })}
    />
  </div>
) : null;

const descriptionDiv = fields.includes("description") ? (
  <div className="col-lg-12  mb-2">
    Description:
    <br />
    <textarea
      value={state.description}
      type="text"
      rows={6}
      className="form-control"
      onChange={(event) => State.update({ description: event.target.value })}
    />
  </div>
) : null;

const amountDiv = fields.includes("amount") ? (
  <div className="col-lg-6  mb-2">
    Amount:
    <input
      type="text"
      value={state.amount}
      onChange={(event) => State.update({ amount: event.target.value })}
    />
  </div>
) : null;

const tokenDiv = fields.includes("sponsorship_token") ? (
  <div className="col-lg-6  mb-2">
    Tokens:
    <input
      type="text"
      value={state.token}
      onChange={(event) => State.update({ token: event.target.value })}
    />
  </div>
) : null;

const supervisorDiv = fields.includes("supervisor") ? (
  <div className="col-lg-6 mb-2">
    Supervisor:
    <input
      type="text"
      value={state.supervisor}
      onChange={(event) => State.update({ supervisor: event.target.value })}
    />
  </div>
) : null;

const disclaimer = (
  <p>
    <i>
      * Note, all projects that were granted sponsorships are required to pass
      KYC to receive the funding.
    </i>
  </p>
);

const renamedPostType = postType == "Submission" ? "Solution" : postType;
// Below there is a weird code with fields.includes("githubLink") ternary operator.
// This is to hack around rendering bug of near.social.
return (
  <div className="card">
    <div className="card-header">
      {mode} {renamedPostType}
    </div>

    <div class="card-body">
      {state.warning ? (
        <div
          class="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          {state.warning}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => State.update({ warning: "" })}
          ></button>
        </div>
      ) : (
        <></>
      )}
      {fields.includes("githubLink") ? (
        <div className="row">
          {githubLinkDiv}
          {labelEditor}
          {nameDiv}
          {descriptionDiv}
        </div>
      ) : (
        <div className="row">
          {labelEditor}
          {nameDiv}
          {amountDiv}
          {tokenDiv}
          {supervisorDiv}
          {descriptionDiv}
        </div>
      )}

      <a className="btn btn-outline-primary mb-2" onClick={onSubmit}>
        Submit
      </a>
      {disclaimer}
    </div>
    <div class="card-footer">
      Preview:
      {widget("components.posts.Post", {
        isPreview: true,
        id: 0, // irrelevant
        post: {
          author_id: state.author_id,
          likes: [],
          snapshot: {
            editor_id: state.editor_id,
            labels: state.labelStrings,
            post_type: postType,
            name: state.name,
            description: state.description,
            amount: state.amount,
            sponsorship_token: state.token,
            supervisor: state.supervisor,
            github_link: state.githubLink,
          },
        },
      })}
    </div>
  </div>
);
