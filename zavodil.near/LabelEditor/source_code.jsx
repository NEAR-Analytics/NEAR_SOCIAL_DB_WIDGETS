// LabelEditor
const ownerId = "zavodil.near";
const appName = "nametag";
const accountId = context.accountId;
const contractId = props.contractId ?? ownerId;
const debug = props.debug ?? false;

if (!accountId) {
  return "Please sign in with NEAR wallet to edit your profile";
}

let profile = Social.getr(`*/${appName}/${contractId}`, "final");
if (profile === null) {
  return "Loading";
}

// current user tags only
const tagsPattern =
  props.tagsPattern ?? `${accountId}/${appName}/${contractId}/tags/*`;
const tagsObject = Social.keys(tagsPattern, "final");
if (tagsObject === null) {
  return "Loading";
}

const tagsCount = {};
const userTags = {};

const processTagsObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (typeof kv[1] === "object") {
      processTagsObject(kv[1]);
    } else {
      const tag = kv[0];
      tagsCount[tag] = (tagsCount[tag] || 0) + 1;
    }
  });
};

const getTags = () => {
  processTagsObject(tagsObject);
  const tags = Object.entries(tagsCount);
  tags.sort((a, b) => b[1] - a[1]);
  return tags.map((t) => ({
    name: t[0],
    count: null,
  }));
};

profile.userTags = getTags();

State.init({ profile });

return (
  <div className="row">
    <div className="col-lg-6">
      <div>
        <h4>Name tag editor</h4>
      </div>
      <div className="mb-2">
        <Widget
          src={`${ownerId}/widget/LabelEditorForm`}
          props={{
            contractId,
            debug,
            initialMetadata: profile,
            onChange: (profile) => {
              State.update({ profile, contractId: profile.contractId });
            },
            options: {
              tags: {
                label: "Tags",
                tagsPattern: `*/${appName}/${state.contractId}/tags/*`,
                placeholder: "Label",
              },
            },
          }}
        />
      </div>
      <div className="mb-2">
        <CommitButton
          data={{
            [appName]: {
              [state.profile.contractId]: { tags: state.profile.tags },
            },
          }}
        >
          Save labels
        </CommitButton>
        <a
          className="btn btn-outline-primary ms-2"
          href={`#/${ownerId}/widget/ContractPage?contractId=${state.contractId}`}
        >
          View profile
        </a>
      </div>
    </div>
    <div className="col-lg-6">
      <div>
        <h4>Preview</h4>
        <br />
      </div>
      <div>
        <Widget
          src={`${ownerId}/widget/ContractPage`}
          props={{ contractId: state.contractId }}
        />
      </div>
    </div>
  </div>
);
