const accountId = context.accountId;

const page = accountId
  ? Social.get(`${accountId}/settings/every/page.nyc`)
  : undefined;

if (page === null) {
  return "Loading...";
}

if (!accountId) {
  return <Widget src="nycdao.near/widget/CommunityOnboarding" />;
}
if (accountId) {
  return <Widget src={page ?? "nycdao.near/widget/NYC.Page"} props={props} />;
}
