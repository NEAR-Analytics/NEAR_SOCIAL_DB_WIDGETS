const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <Widget
        src="gov.near/widget/Join"
        props={{ ownerId, profile, link: true }}
      />

      <div className="mt-3">
        <Widget
          src="gov.near/widget/Membership"
          props={{ ownerId, tab: props.tab }}
        />
      </div>
    </div>
  </div>
);
