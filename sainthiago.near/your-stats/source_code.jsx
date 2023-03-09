const accountId = props.accountId || context.accountId;

if (!accountId) {
  return <></>;
}

const stats = Social.index("notify", accountId, { order: "desc" });

const following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const followers = Social.keys(`*/graph/follow/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const numFollowing = following
  ? Object.keys(following[accountId].graph.follow || {}).length
  : 0;

const numFollowers = followers ? Object.keys(followers || {}).length : 0;

const nfts = fetch(
  `https://api.kitwallet.app/account/${accountId}/likelyNFTsFromBlock`
);

const numNfts = nfts?.body?.list?.length || 0;

const widgets = Social.keys(`${accountId ?? "*"}/widget/*`, "final");

const numWidgets = widgets[accountId]?.widget
  ? Object.keys(widgets[accountId].widget).length
  : 0;

if (!nfts.ok || stats === null) {
  return "Loading";
}

return (
  <div class="d-flex flex-wrap gap-2 justify-content-center">
    <div class="col col-md-2">
      <div class="card card-stats mb-4 mb-xl-0">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <h6 class="text-uppercase text-muted mb-0">Owned Nfts</h6>
              <span class="h3 font-weight-bold mb-0">{numNfts}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col col-md-2">
      <div class="card card-stats mb-4 mb-xl-0">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <h6 class="card-title text-uppercase text-muted mb-0">
                Created Widgets
              </h6>
              <span class="h3 font-weight-bold mb-0">{numWidgets}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col col-md-2">
      <div class="card card-stats mb-4 mb-xl-0">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <h6 class="card-title text-uppercase text-muted mb-0">
                Following
              </h6>
              <span class="h3 font-weight-bold mb-0">{numFollowing}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col col-md-2">
      <div class="card card-stats mb-4 mb-xl-0">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <h6 class="card-title text-uppercase text-muted mb-0">
                Followers
              </h6>
              <span class="h3 font-weight-bold mb-0">{numFollowers}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col col-md-2">
      <div class="card card-stats mb-4 mb-xl-0">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <h6 class="card-title text-uppercase text-muted mb-0">
                Unfollowers
              </h6>
              <span class="h3 font-weight-bold mb-0">
                {" "}
                {
                  stats.filter(
                    (notification) => notification.value.type === "unfollow"
                  ).length
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col col-md-2">
      <div class="card card-stats mb-4 mb-xl-0">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <h6 class="card-title text-uppercase text-muted mb-0">
                Mentions
              </h6>
              <span class="h3 font-weight-bold mb-0">
                {
                  stats.filter(
                    (notification) => notification.value.type === "mention"
                  ).length
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col col-md-2">
      <div class="card card-stats mb-4 mb-xl-0">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <h6 class="card-title text-uppercase text-muted mb-0">
                Likes given to you
              </h6>
              <span class="h3 font-weight-bold mb-0">
                {
                  stats.filter(
                    (notification) => notification.value.type === "like"
                  ).length
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col col-md-2">
      <div class="card card-stats mb-4 mb-xl-0">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <h6 class="card-title text-uppercase text-muted mb-0">
                Comments to you
              </h6>
              <span class="h3 font-weight-bold mb-0">
                {
                  stats.filter(
                    (notification) => notification.value.type === "comment"
                  ).length
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
