const accountId = context.accountId;

if (context.loading) {
  return "Loading";
}

if (!accountId) {
  return "Sign in with NEAR Wallet";
}

const notifications = Social.index("notify", accountId, {
  order: "desc",
  limit: 100,
});

if (notifications === null) {
  return "Loading";
}

if (notifications.length === 0) {
  return "No notifications";
}

Storage.set("lastBlockHeight", notifications[0].blockHeight);

setTimeout(() => {
  console.log("this is the first message");
}, 5000);

return (
  <>
    {notifications.map(({ accountId, blockHeight, value }, i) => (
      <div key={i} className="d-flex justify-content-between mb-3">
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
              : value.type === "poke"
              ? "poked you"
              : value.type === "state-transition"
              ? "state transition"
              : "???"}
            <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
          </div>
        </div>
        <div className="text-nowrap">
          {value.type === "follow" || value.type === "unfollow" ? (
            <Widget src="mob.near/widget/FollowButton" props={{ accountId }} />
          ) : (
            <Widget
              src="mob.near/widget/PokeButton"
              props={{ accountId, back: true }}
            />
          )}
        </div>
      </div>
    ))}
  </>
);
