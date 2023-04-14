const accountId = props.debugAccountId ?? context.accountId;

const project = Social.getr(`${accountId}/project`);

if (project === null) {
  return "";
}

const name = project.name;
const image = project.image;

const editProjectButton = (
  <div>
    <a className="btn btn-success" href="#/gov.near/widget/ProjectEditor">
      Edit Project
    </a>
  </div>
);

if (!name) {
  return (
    <div className="alert alert-warning">
      <p>Your project is missing a name.</p>
      {editProjectButton}
    </div>
  );
}

if (
  !image.ipfs_cid &&
  (!image.nft.contractId || !image.nft.tokenId) &&
  !image.url
) {
  return (
    <div className="alert alert-warning">
      <p>Your project is missing an image.</p>
      {editProjectButton}
    </div>
  );
}

return <></>;
