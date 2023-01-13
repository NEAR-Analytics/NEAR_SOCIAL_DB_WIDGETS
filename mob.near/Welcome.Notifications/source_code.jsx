const accountId = context.accountId;

if (!accountId) {
  return "Sign in with NEAR Wallet";
}

const index = {
  action: "notify",
  key: accountId,
  options: {
    limit: 3,
    order: "desc",
  },
};

const items = Social.index(index.action, index.key, index.options);
if (items === null) {
  return "";
}

const renderItem = (item, i) => {
  return (
    <Widget src="mob.near/widget/Notification.Item" key={i} props={item} />
  );
};

return (
  <>
    {items.map(renderItem)}
    <div>
      <a href="#/mob.near/widget/NotificationFeed">All Notifications</a>
    </div>
  </>
);
