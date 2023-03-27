const accountId = props.debugAccountId ?? context.accountId;

// change this back to !accountId
if (accountId) {
  return (
    <div>
      <div class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">NEAR ATLAS</h1>
            <p class="lead text-muted">
              Your Very Own Atlas To Find Everything About NEAR.
              <b />
              Map Your Journey With Us.
            </p>
            <p>
              <Widget
                src="mob.near/widget/ProfileImage"
                props={{ accountId: "" }}
              />
            </p>
          </div>
        </div>
        <div class="album py-5 bg-dark">
          <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-3 ">
              <div class="col">
                <div class="card shadow-sm bg-dark">
                  <Widget
                    src="y3k.near/widget/NEAR-ATLAS-MonthlyActiveAcounts"
                    props={{}}
                  />

                  <div class="card-body">
                    <p class="card-text">MonthlyActiveAcounts</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <button
                          type="button"
                          class="btn btn-sm btn-outline-secondary"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          class="btn btn-sm btn-outline-secondary"
                        >
                          -
                        </button>
                      </div>
                      <small class="text-muted">time: 00s</small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card shadow-sm bg-dark">
                  <Widget
                    src="y3k.near/widget/NEAR.ATLAS.NewMonthlyActiveAcounts"
                    props={{}}
                  />

                  <div class="card-body">
                    <p class="card-text">NewMonthlyActiveAcounts</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <button
                          type="button"
                          class="btn btn-sm btn-outline-secondary"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          class="btn btn-sm btn-outline-secondary"
                        >
                          -
                        </button>
                      </div>
                      <small class="text-muted">time: 00s</small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="card shadow-sm bg-dark">
                  <Widget
                    src="y3k.near/widget/NEAR.ATLAS.NEAR_SOCIAL_DATA"
                    props={{}}
                  />

                  <div class="card-body">
                    <p class="card-text">NEAR_SOCIAL_DATA</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <button
                          type="button"
                          class="btn btn-sm btn-outline-secondary"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          class="btn btn-sm btn-outline-secondary"
                        >
                          -
                        </button>
                      </div>
                      <small class="text-muted">time: 00s</small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="card shadow-sm bg-dark">
                  <Widget
                    src="y3k.near/widget/NEAR.ATLAS.DATA.CHAINS_TWITTER"
                    props={{}}
                  />

                  <div class="card-body">
                    <p class="card-text">NEAR.ATLAS.DATA.CHAINS_TWITTER</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <button
                          type="button"
                          class="btn btn-sm btn-outline-secondary"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          class="btn btn-sm btn-outline-secondary"
                        >
                          -
                        </button>
                      </div>
                      <small class="text-muted">time: 00s</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row py-lg-5">
          <div class="col-lg-8 col-md-8">
            <h1 class="fw-light">NEAR Dapps Overview</h1>
            <p>
              <Widget
                src="y3k.near/widget/NEAR.ATLAS.DAPPS.OVERVIEW"
                props={{ accountId: "" }}
              />
            </p>
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
