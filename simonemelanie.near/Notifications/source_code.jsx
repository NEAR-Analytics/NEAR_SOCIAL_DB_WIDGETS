const card = {
  background: "linear-gradient(to right, #72f786, #33ffff)",
  border: "1px solid black",
  borderRadius: "5px",
  textAlign: "center",
  margin: "5px 0",
};

const container = {};

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

const myVar = [];

notifications.forEach((notification) => {
  myVar.push(
    <div style={card}>
      <p>{notification.value.type}</p>
      <p>
        {notification.accountId} ({notification.blockHeight})
      </p>
    </div>
  );
});

return <div style={container}>{myVar}</div>;
