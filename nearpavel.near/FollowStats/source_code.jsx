const accountId = props.accountId;
const commonFollows = props.commonFollows || 0;

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

const statItem = ({ value, label, url }) => {
  if (!value) return <></>;
  return (
    <div className="me-4">
      <a href={url} className="text-dark" target="_blank">
        {numFollowing !== null ? (
          <span className="fw-bolder">{value}</span>
        ) : (
          "?"
        )}{" "}
        <span className="text-muted">{label}</span>
      </a>
    </div>
  );
};

return (
  <div>
    <div className="d-flex flex-row">
      {statItem({
        value: commonFollows,
        label: `Common Follows`,
        url: `#`,
      })}
      {statItem({
        value: numFollowing,
        label: "Following",
        url: `#/mob.near/widget/FollowPage?accountId=${accountId}&tab=following`,
      })}
      {statItem({
        value: numFollowers,
        label: `Follower${numFollowers !== 1 && "s"}`,
        url: `#/mob.near/widget/FollowPage?accountId=${accountId}&tab=followers`,
      })}
    </div>
  </div>
);
