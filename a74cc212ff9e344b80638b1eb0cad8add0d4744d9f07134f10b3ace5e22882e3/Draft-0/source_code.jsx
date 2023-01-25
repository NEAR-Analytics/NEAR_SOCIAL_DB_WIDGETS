const accountId = props.debugAccountId ?? context.accountId;

const project = Social.getr(`${accountId}/project`);

const name = project.name;
const image = project.image;

const editProjectButton = (
  <div>
    <a className="btn btn-success" href="#/gov.near/widget/ProjectEditor">
      Create Project
    </a>
  </div>
);

if (!project) {
  return (
    <div>
      <p>Create your project!</p>
      {editProjectButton}
    </div>
  );
}

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
