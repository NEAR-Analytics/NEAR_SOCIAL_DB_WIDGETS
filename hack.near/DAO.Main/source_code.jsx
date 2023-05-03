const accountId = props.accountId ?? context.accountId;

const feed = accountId
  ? Social.get(`${accountId}/settings/dao/page.feed`)
  : undefined;

if (feed === null) {
  return "Loading...";
}

return <Widget src={feed ?? "hack.near/widget/DAO.Social"} props={props} />;
