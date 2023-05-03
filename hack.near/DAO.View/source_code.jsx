const daoId = props.daoId ?? "multi.sputnik-dao.near";

const proposal = Near.view(daoId, "get_proposal", {
  id: 0,
});

console.log(proposal);

return <h3>{proposal}</h3>;
