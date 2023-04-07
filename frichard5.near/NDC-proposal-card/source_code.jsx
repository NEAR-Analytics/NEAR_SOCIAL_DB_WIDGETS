const proposal = props.proposal;

const ProposalCard = styled.div`
  height: 300px;
  width: 80%;
  margin: 50px auto;
  box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
  overflow: auto;
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

const Status = styled.span`
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

return (
  <ProposalCard>
    <div>Id: {proposal.proposal_id}</div>
    <div>Type: {proposal.proposal_type}</div>
    <div>Submission Time: {proposal.submission_time}</div>
    <div>Proposer: {proposal.proposal.proposer}</div>
    <div>
      Status: <Status status={proposal.status}>{proposal.status}</Status>
    </div>
    <p>{proposal.proposal.description}</p>
    <div>
      Votes:
      {voteList}
    </div>
  </ProposalCard>
);
