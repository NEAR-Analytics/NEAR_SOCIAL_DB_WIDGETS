const accountId = props.debugAccountId ?? context.accountId;

// change this back to !accountId
if (accountId) {
  return (
    <div
      className="alert alert-success rounded-4 mb-3"
      style={{
        background:
          "linear-gradient(to right, rgba(106, 17, 203, 0.9), rgba(37, 117, 252, 0.9))",
      }}
    >
      <div className="text-end">
        <div className="fw-bold">
          Login With NEAR WALLET
          <i class="fs-1 align-middle bi bi-arrow-return-right" />
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
    <div className="alert alert-warning rounded-4 mb-3">
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
    <div className="alert alert-warning rounded-4 mb-3">
      <p>Your profile is missing a picture.</p>
      {editProfileButton}
    </div>
  );
}

return <></>;
