const accountId = props.debugAccountId ?? context.accountId;

// change this back to !accountId
if (!accountId) {
}

const profile = Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "";
}

const name = profile.name;
const image = profile.image;

return (
  <div>
    <div>
      {accountId && !name && (
        <div className="alert alert-warning rounded-4 mb-3">
          <p>Your profile is missing a name.</p>
          {editProfileButton}
        </div>
      )}

      {accountId &&
        !image.ipfs_cid &&
        (!image.nft.contractId || !image.nft.tokenId) &&
        !image.url && (
          <div className="alert alert-warning rounded-4 mb-3">
            <p>Your profile is missing a picture.</p>
            {editProfileButton}
          </div>
        )}
    </div>
    <div class="text-center">
      <div class="">
        <div class="row  ">
          <h1 class="fw-light">Total Supply</h1>

          <div class="row ">
            <Widget
              src="abhishekanirudhan.near/widget/NEAR.ATLAS.TOTAL_SUPPLY"
              props={{}}
            />
          </div>
          <hr />
          <div className="py-5">
            <div class="row py-5">
              <div class="card shadow-sm bg-dark">
                <h1 class="fw-light">Total NEAR Staked</h1>

                <Widget src="abhishekanirudhan.near/widget/NEAR.ATLAS.TOTAL_STAKED" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
