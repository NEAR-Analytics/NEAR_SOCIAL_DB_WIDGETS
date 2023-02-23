const ownerId = "gov.near";

const following = Social.keys(`${ownerId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const followers = Social.keys(`*/graph/follow/${ownerId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const numFollowing = following
  ? Object.keys(following[ownerId].graph.follow || {}).length
  : null;
const numFollowers = followers ? Object.keys(followers || {}).length : null;

return (
  <div>
    <div className="d-flex flex-row">
      <div className="me-4">
        <a
          href={`#/mob.near/widget/FollowPage?ownerId=${ownerId}&tab=following`}
          className="text-dark"
        >
          {numFollowing !== null ? (
            <span className="fw-bolder">{numFollowing}</span>
          ) : (
            "?"
          )}{" "}
          <span className="text-muted">Following</span>
        </a>
      </div>
      <div>
        <a
          href={`#/mob.near/widget/FollowPage?ownerId=${ownerId}&tab=followers`}
          className="text-dark"
        >
          {numFollowers !== null ? (
            <span className="fw-bolder">{numFollowers}</span>
          ) : (
            "?"
          )}{" "}
          <span className="text-muted">
            Follower{numFollowers !== 1 && "s"}
          </span>
        </a>
      </div>
    </div>
  </div>
);
