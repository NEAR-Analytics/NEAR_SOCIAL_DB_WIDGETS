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

Storage.set(lastBlockHeight, notifications[0].blockHeight);

return notifications;
