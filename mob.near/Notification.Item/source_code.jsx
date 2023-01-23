const { accountId, blockHeight, value } = props;

return (
  <div className="mb-3">
    {value.type === "follow" || value.type === "unfollow" ? (
      <Widget src="mob.near/widget/Notification.Item.Follow" props={props} />
    ) : value.type === "poke" ? (
      <Widget src="mob.near/widget/Notification.Item.Poke" props={props} />
    ) : value.type === "like" ? (
      <Widget src="mob.near/widget/Notification.Item.Like" props={props} />
    ) : value.type === "comment" ? (
      <Widget src="mob.near/widget/Notification.Item.Comment" props={props} />
    ) : (
      "???"
    )}
  </div>
);
