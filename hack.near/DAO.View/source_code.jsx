const daoId = props.daoId ?? "multi.sputnik-dao.near";

const defaultId = 1;

State.init({
  proposal_id: state.proposal_id ?? defaultId,
});

const onChangeProposal = (proposal_id) => {
  State.update({
    proposal_id,
  });
};

const proposal = Near.view(daoId, "get_proposal", {
  id: state.proposal_id,
});

const handleApprove = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "act_proposal",
      args: {
        id: state.proposal_id,
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
        id: state.proposal_id,
        action: "VoteReject",
      },
      gas: 200000000000000,
    },
  ]);
};

console.log(proposal_id);
console.log(state.proposal_id);

return (
  <>
    <input
      type="number"
      placeholder="Input Proposal ID Here"
      value={state.proposal_id}
      onChange={(e) => onChangeProposal(e.target.value)}
    />
    <hr />
    <p>Proposal #{state.proposal_id}</p>

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
