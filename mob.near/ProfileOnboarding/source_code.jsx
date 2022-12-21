const accountId = props.debugAccountId ?? context.accountId;

if (!accountId) {
  return (
    <div className="alert alert-warning rounded-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="fw-bold">Sign in to start using near.social</div>
        <div>
          <i class="fs-1 text-danger bi bi-arrow-up" />
        </div>
      </div>
    </div>
  );
}

const profile = Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "";
}

const name = profile.name;
const image = profile.image;

const editProfileButton = (
  <div>
    <a className="btn btn-success" href="#/mob.near/widget/ProfileEditor">
      Edit Profile
    </a>
  </div>
);

if (!name) {
  return (
    <div className="alert alert-warning rounded-4">
      <p>Your profile is missing a name.</p>
      {editProfileButton}
    </div>
  );
}

if (
  !image.ipfs_cid &&
  (!image.nft.contractId || !image.nft.tokenId) &&
  !image.url
) {
  return (
    <div className="alert alert-warning rounded-4">
      <p>Your profile is missing a picture.</p>
      {editProfileButton}
    </div>
  );
}

return <></>;
