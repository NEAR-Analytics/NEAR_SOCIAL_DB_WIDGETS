const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <Widget
        src="mob.near/widget/ProfileLarge"
        props={{ accountId, profile, link: true }}
      />

      <div className="mt-3">
        <Widget
          src="mob.near/widget/FollowTabs"
          props={{ accountId, tab: props.tab }}
        />
      </div>
    </div>
  </div>
);
