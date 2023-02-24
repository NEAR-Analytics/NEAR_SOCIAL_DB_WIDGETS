// LabelEditor
const ownerId = "gov.near";
const appName = "profile";
const accountId = context.accountId;
const contractId = props.contractId ?? accountId;

if (!accountId) {
  return "Please connect your NEAR wallet.";
}

State.init({ contractId });

const metadata = Social.getr(`${accountId}/${appName}/tags/*`, "final");

// current user tags only
const pattern = `*/${appName}/*/tags/*`;

return (
  <div className="row">
    <div className="col-lg-6">
      <div>
        <h4>Skill Badges</h4>
      </div>
      <div className="mb-2">
        NEAR Wallet ID:
        <input
          type="text"
          value={state.contractId}
          onChange={(event) =>
            State.update({ contractId: event.target.value.toLowerCase() })
          }
        />
      </div>
      <div className="mb-2" style={{ minHeight: "62px" }}>
        {metadata !== null ? (
          <Widget
            src={"mob.near/widget/MetadataEditor"}
            key={`public-tags-metadata-${state.contractId}`}
            props={{
              initialMetadata: metadata,
              onChange: (metadata) => {
                State.update({ metadata });
              },
              options: {
                tags: {
                  label: "Domains of Expertise:",
                  pattern,
                  placeholder: "dev, art, social, edu, mod",
                },
              },
            }}
          />
        ) : (
          "Loading"
        )}
      </div>
      <div className="mb-2">
        <CommitButton
          disabled={metadata === null}
          data={{
            [appName]: {
              [state.contractId]: state.metadata,
            },
          }}
        >
          Update Skills
        </CommitButton>
        <a
          className="btn btn-outline-primary ms-2"
          href={`#/zavodil.near/widget/AllLabels?accountId=${accountId}`}
        >
          View All
        </a>
      </div>
    </div>
    <div className="col-lg-6">
      <div>
        <h4>Preview</h4>
        Add Labels:
        <br />
      </div>
      <div className="card">
        <div className="card-body">
          <div className="text-truncate">
            <Widget src={`mob.near/widget/ProfileLine`} props={{ accountId }} />
          </div>
          <Widget
            src={`mob.near/widget/PublicTags`}
            props={{
              accountId,
              extraTags: state.metadata.tags,
            }}
          />
        </div>
      </div>
    </div>
  </div>
);
