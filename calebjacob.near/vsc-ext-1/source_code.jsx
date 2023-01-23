const accountId = props.accountId || context.accountId;

return (
  <>
    {accountId}
    <Widget
      src="mob.near/widget/Profile"
      props={{ accountId: 'calebjacob.near' }}
    />
  </>
);
