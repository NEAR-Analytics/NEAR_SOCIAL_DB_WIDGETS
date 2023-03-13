const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

return (
  <div className="py-1 bg-gradient px-1">
    <div className="mx-auto">
      <Widget
        src="mob.near/widget/ProfileLarge"
        props={{
          accountId,
          profile,
          link: true,
          showEditButton: !props.profile,
        }}
      />

      <div className="mt-3">
        <Widget
          src="mob.near/widget/ProfileTabs"
          props={{ accountId, profile }}
        />
        <div className="p-3 bg-info bg-gradient">
          <Widget src="denysk.near/widget/PriceStats" props={{}} />
        </div>
      </div>
    </div>
  </div>
);
