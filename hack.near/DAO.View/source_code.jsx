const daoId = props.daoId ?? "multi.sputnik-dao.near";

const proposals = Near.view(daoId, "get_proposals", {
  from_index: 0,
  limit: 5,
});

console.log(proposals);

const proposal = proposals.id[0];

console.log(proposal);

return (
  <div>
    <h3>{proposal}</h3>
  </div>
);
