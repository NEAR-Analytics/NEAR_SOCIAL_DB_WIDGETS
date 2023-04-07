const proposal = props.proposal;

const ProposalCard = styled.div`
  position: relative;
  height: 300px;
  width: 80%;
  margin: 50px auto;
  box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
  overflow: auto;
  border-radius: 4px;
  padding: 20px;
`;

const votes = proposal.proposal.votes;

const voteList = votes
  ? Object.keys(votes).map((voter) => {
      return (
        <>
          <span>{voter}:</span>
          <span>{votes[voter]}</span>
        </>
      );
    })
  : "";

const Status = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-weight: 700;
  color: ${(props) => {
    switch (props.status) {
      case "Rejected":
        return "red";
      case "Approved":
        return "green";
      case "Expired":
        return "grey";
      case "InProgress":
        return "orange";
    }
  }}
`;

const ProposalId = styled.div`
  position: absolute;
  top:20px;
  left: 20px;
  color:#8c8c8c;
  font-size: 11px;
`;

return (
  <ProposalCard>
    <ProposalId>Proposal Id {proposal.proposal_id}</ProposalId>
    <div>Type: {proposal.proposal_type}</div>
    <div>Submission Time: {proposal.submission_time}</div>
    <div>Proposer: {proposal.proposal.proposer}</div>
    <Status status={proposal.status}>{proposal.status}</Status>
    <p>{proposal.proposal.description}</p>
    <div>
      Votes:
      {voteList}
    </div>
  </ProposalCard>
);
