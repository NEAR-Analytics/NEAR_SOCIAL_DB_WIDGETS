const accountId = props.debugAccountId ?? context.accountId;

// change this back to !accountId
if (accountId) {
  return (
    <div class="container py-6">
      <div class="row align-items-center">
        <div class="col-xl-6">
          <div class="lc-block mb-3">
            <div editable="rich">
              <h2 class="fw-bold display-5">NEAR ATLAS</h2>
            </div>
          </div>
          <div class="lc-block mb-3">
            <div editable="rich">
              <p class="fw-light rfs-11">
                Your Very Own Atlas To Find Everything About NEAR.
                <br />
                Map Your Journey With Us.
                <br />
              </p>
            </div>
          </div>
          <div class="lc-block">
            <div editable="rich">
              <p>
                {" "}
                Discover a decentralized world with our all-in-one on-chain
                atlas. Our atlas brings together explorers, creators, and
                communities in one accessible location. <br />
                Experience seamless transactions, secure listings, and a
                user-friendly interface that makes exploring the NEAR blockchain
                ecosystem easier than ever before.
              </p>
            </div>
          </div>
        </div>
        <div class="col-xl-6 row row-cols-1 row-cols-md-2 g-3 counter-1">
          <div class="col">
            <div class="card card-body shadow border-0">
              <div class="d-inline-flex align-items-center">
                <div></div>
                <div>
                  <p class="lead" editable="inline">
                    <strong>Projects</strong>Done
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card card-body shadow border-0">
              <div class="d-inline-flex align-items-center">
                <div></div>

                <div>
                  <p editable="inline" class="lead">
                    <strong>Customers</strong>Satisfied
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card card-body shadow border-0">
              <div class="d-inline-flex align-items-center">
                <div></div>

                <div>
                  <p editable="inline" class="lead">
                    <strong>Employees</strong>in the World
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card card-body shadow border-0">
              <div class="d-inline-flex align-items-center">
                <div></div>

                <div>
                  <p editable="inline" class="lead">
                    <strong>Branches</strong>In EU
                  </p>
                </div>
              </div>
            </div>
          </div>
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
