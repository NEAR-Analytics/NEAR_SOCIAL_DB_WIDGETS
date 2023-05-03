const daoId = props.daoId;

const feed = daoId ? Social.get(`${daoId}/settings/dao/feed`) : undefined;

if (feed === null) {
  return "Loading...";
}

return <Widget src={feed ?? "hack.near/widget/DAO.Social"} props={daoId} />;
