const card = {
  background: "linear-gradient(to right, #fc4491, #ff952b)",
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

const notifications = Social.index("notify", accountId, { order: "desc" });

if (notifications == null) {
  return "Loading";
}

if (notifications.length == 0) {
  return "No notifications";
}

Storage.set("lastBlockHeight", notifications[0].blockHeight);

const notificationsArray = [];

notifications.forEach((notification) => {
  let renderCard = (
    <div style={card}>
      <p>
        <strong>{notification.accountId}</strong> followed you
      </p>
    </div>
  );
  if (notification.value.type == "follow") {
    renderCard = (
      <div style={card}>
        <p>
          <strong>{notification.accountId}</strong> followed you
        </p>
      </div>
    );
    notificationsArray.push(renderCard);
  }
});

return <div style={container}>{notificationsArray}</div>;
