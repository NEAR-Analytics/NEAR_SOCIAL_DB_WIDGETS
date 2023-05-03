const daoId = props.daoId ?? "multi.sputnik-dao.near";

const proposal = Near.view(daoId, "get_proposal", {
  id: 15,
});

const handleApprove = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "act_proposal",
      args: {
        id: 1,
        action: "VoteApprove",
      },
      gas: 200000000000000,
    },
  ]);
};

return (
  <>
    <h3>Proposal #{proposal.id}</h3>
    <h5>by {proposal.proposer}</h5>
    <p>{proposal.description}</p>
    <div>
      <h4>Vote Below</h4>
      <a className="btn btn-outline-success" onClick={handleApprove}>
        Yes
      </a>
      <a className="btn btn-outline-danger" onClick={handleReject}>
        No
      </a>
    </div>
  </>
);
