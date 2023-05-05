const daoId = props.daoId ?? props.accountId ?? context.accountId;

const feed = accountId
  ? Social.get(`${accountId}/settings/dao/feed`)
  : undefined;

if (feed === null) {
  return "Loading...";
}

return <Widget src={feed ?? "hack.near/widget/DAO.Social"} props={daoId} />;
