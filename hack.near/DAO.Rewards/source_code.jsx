const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";

return (
  <>
    <Widget src="hack.near/widget/DAO.Reward.Proposal" props={props} />
    <hr />
    <Widget src="hack.near/widget/DAO.Reward.Claim" props={props} />
  </>
);
