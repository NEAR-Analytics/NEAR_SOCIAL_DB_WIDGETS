const daoId = props.daoId ?? "multi.sputnik-dao.near";

const proposal_id = props.id ?? 1;

const proposal = Near.view(daoId, "get_proposal", {
  id: JSON.parse(proposal_id),
});

const handleApprove = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "act_proposal",
      args: {
        id: JSON.parse(proposal_id),
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
        id: JSON.parse(proposal_id),
        action: "VoteReject",
      },
      gas: 200000000000000,
    },
  ]);
};

return (
  <>
    <h5>Proposal #{proposal_id}</h5>
    <p>
      <i>
        by <b>{proposal.proposer}</b>
      </i>
    </p>
    <p>{proposal.description}</p>
    <div>
      <a className="btn btn-outline-success" onClick={handleApprove}>
        Yes
      </a>
      <a className="btn btn-outline-danger" onClick={handleReject}>
        No
      </a>
      <hr />
    </div>
  </>
);
