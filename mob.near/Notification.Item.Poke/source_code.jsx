const { accountId } = props;

return (
  <Widget
    src="mob.near/widget/Notification.Item.LR"
    props={{
      L: "poked you",
      R: (
        <Widget
          src="mob.near/widget/PokeButton"
          props={{ accountId, back: true }}
        />
      ),
      ...props,
    }}
  />
);
