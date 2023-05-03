const daoId = props.daoId ?? "multi.sputnik-dao.near";

const proposal = Near.view(daoId, "get_proposal", {
  id: props.id ?? 1,
});

const handleApprove = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "act_proposal",
      args: {
        id: props.id,
        action: "VoteApprove",
      },
      gas: 200000000000000,
    },
  ]);
};

const handleReject = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "act_proposal",
      args: {
        id: props.id,
        action: "VoteReject",
      },
      gas: 200000000000000,
    },
  ]);
};

return (
  <>
    <p>Proposal #{props.id}</p>

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
