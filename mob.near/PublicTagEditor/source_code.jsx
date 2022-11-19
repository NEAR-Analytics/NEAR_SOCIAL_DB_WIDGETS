// LabelEditor
const ownerId = "zavodil.near";
const appName = "nametag";
const accountId = context.accountId;
const contractId = props.contractId ?? ownerId;
const debug = props.debug ?? false;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

State.init({ contractId });

const metadata = Social.getr(`*/${appName}/${state.contractId}`, "final");
if (metadata === null) {
  return "Loading";
}

// current user tags only
const tagsPattern = `*/${appName}/*/tags/*`;

return (
  <div className="row">
    <div className="col-lg-6">
      <div>
        <h4>Name tag editor</h4>
      </div>
      <div className="mb-2">
        <Widget
          src={"mob.near/widget/MetadataEditor"}
          key={`public-tags-${contractId}`}
          props={{
            initialMetadata: metadata,
            onChange: (metadata) => {
              State.update({ metadata });
            },
            options: {
              tags: {
                label: "Public Tags",
                pattern,
                placeholder: "binance, cex, nft, ft, fake, scam",
              },
            },
          }}
        />
      </div>
      <div className="mb-2">
        <CommitButton
          data={{
            [appName]: {
              [state.contractId]: state.metadata,
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
