const accountId = context.accountId;

if (context.loading) {
  return "Loading";
}

if (!accountId) {
  return "Sign in with NEAR Wallet";
}

const notifications = Social.index("notify", accountId, {
  order: "desc",
});

if (notifications === null) {
  return "Loading";
}

if (notifications.length === 0) {
  return "No notifications";
}

Storage.set("lastBlockHeight", notifications[0].blockHeight);

return (
  <>
    {notifications.map(({ accountId, blockHeight, value }) => (
      <div className="d-flex justify-content-between mb-3">
        <div className="me-4 text-truncate">
          <div className="text-truncate">
            <Widget src="mob.near/widget/ProfileLine" props={{ accountId }} />
          </div>
          <div
            className="text-truncate text-muted"
            style={{ paddingLeft: "1.8em" }}
          >
            {value.type === "follow"
              ? "followed you"
              : value.type === "unfollow"
              ? "unfollowed you"
              : "???"}
            <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
          </div>
        </div>
        <div className="text-nowrap">
          <Widget src="mob.near/widget/FollowButton" props={{ accountId }} />
        </div>
      </div>
    ))}
  </>
);
