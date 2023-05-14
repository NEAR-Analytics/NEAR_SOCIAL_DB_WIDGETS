const accountId = context.accountId;

const page = accountId
  ? Social.get(`${accountId}/settings/dev/page`)
  : undefined;

if (page === null) {
  return "Loading...";
}

return <Widget src={page ?? "hack.near/widget/dev.Page"} props={props} />;
