const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading";
}

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <Widget
        src="chefsale.near/widget/ProfileLarge"
        props={{
          accountId,
          profile,
          link: true,
          showEditButton: !props.profile,
        }}
      />

      <div className="mt-3">
        <Widget
          src="chefsale.near/widget/ProfileTabs"
          props={{ accountId, profile }}
        />
      </div>
    </div>

    <Widget src="chefsale.near/widget/BlogFeed" props={{}} />
  </div>
);
