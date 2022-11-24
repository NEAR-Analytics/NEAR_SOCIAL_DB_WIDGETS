const accountId = props.accountId;

if (!accountId) {
  return "";
}

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
  : null;
const numFollowers = followers ? Object.keys(followers || {}).length : null;

return (
  <div>
    <div className="d-flex flex-row">
      <div className="me-4">
        {numFollowing !== null ? (
          <span className="fw-bolder">{numFollowing}</span>
        ) : (
          "?"
        )}{" "}
        <span className="text-muted">Following</span>
      </div>
      <div>
        {numFollowers !== null ? (
          <span className="fw-bolder">{numFollowers}</span>
        ) : (
          "?"
        )}{" "}
        <span className="text-muted">Followers</span>
      </div>
    </div>
  </div>
);
