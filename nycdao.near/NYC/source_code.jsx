const accountId = context.accountId;

const page = accountId
  ? Social.get(`${accountId}/settings/every/page.nyc`)
  : undefined;

if (page === null) {
  return "Loading...";
}

return <Widget src={page ?? "nycdao.near/widget/NYC.Page"} props={props} />;
