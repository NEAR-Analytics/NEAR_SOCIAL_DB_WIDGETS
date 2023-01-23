const { accountId, value } = props;

return (
  <Widget
    src="mob.near/widget/Notification.Item.LR"
    props={{
      L: value.type === "follow" ? "followed you" : "unfollowed you",
      R: <Widget src="mob.near/widget/FollowButton" props={{ accountId }} />,
      ...props,
    }}
  />
);
