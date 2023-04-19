const accountId = props.debugAccountId ?? context.accountId;

if (!accountId) {
  return (
    <div>
      <Widget src="readylayerone.near/widget/ShardDog-CreateAFreeWallet" />
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
