const accountId = context.accountId;

if (!accountId) {
  return "Sign in with NEAR Wallet";
}

const index = {
  action: "notify",
  key: accountId,
  options: {
    limit: 10,
    order: "desc",
    subscribe: true,
  },
};

const renderItem = (item, i) => {
  if (i === 0) {
    Storage.set("lastBlockHeight", item.blockHeight);
  }
  return (
    <Widget src="mob.near/widget/Notification.Item" key={i} props={item} />
  );
};

return <Widget src="mob.near/widget/IndexFeed" props={{ index, renderItem }} />;
