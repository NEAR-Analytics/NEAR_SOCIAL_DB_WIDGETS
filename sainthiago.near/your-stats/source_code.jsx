const accountId = context.accountId;

if (context.loading) {
  return "Loading";
}

if (!accountId) {
  return "Sign in with NEAR Wallet";
}

const stats = Social.index("notify", accountId, { order: "desc" });

if (stats == null) {
  return "Loading";
}

if (stats.length == 0) {
  return "No stats for your account";
}

return (
  <div class="d-flex flex-column">
    <h5>your-stats:</h5>{" "}
    <p class="mb-0">
      -{" "}
      {
        stats.filter((notification) => notification.value.type === "follow")
          .length
      }
      humans followed you.
    </p>
    <p class="mb-0">
      -{" "}
      {
        stats.filter((notification) => notification.value.type === "unfollow")
          .length
      }{" "}
      humans unfollowed you.
    </p>
    <p class="mb-0">
      -{" "}
      {
        stats.filter((notification) => notification.value.type === "mention")
          .length
      }{" "}
      mentions.
    </p>
    <p class="mb-0">
      -{" "}
      {
        stats.filter((notification) => notification.value.type === "like")
          .length
      }{" "}
      likes on your content so far.
    </p>
    <p class="mb-0">
      -{" "}
      {
        stats.filter((notification) => notification.value.type === "comment")
          .length
      }{" "}
      comments on something you wrote.
    </p>
  </div>
);
