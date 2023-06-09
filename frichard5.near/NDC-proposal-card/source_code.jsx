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
  font-weight: 700;
  color: ${(props) => {
    switch (props.status) {
      case "Rejected":
        return "#ff5e03";
      case "Approved":
        return "#13a36e";
      case "Expired":
        return "grey";
      case "InProgress":
        return "#ff8743";
    }
  }}
`;

const ProposalId = styled.div`
  color:#8c8c8c;
  font-size: 11px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Proposer = styled.div`

`;

const Type = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

return (
  <ProposalCard>
    <Header>
      <Status status={proposal.status}>{proposal.status}</Status>
      <ProposalId>Proposal Id {proposal.proposal_id}</ProposalId>
    </Header>
    <Type>{proposal.proposal_type}</Type>
    <div>Submission Time: {proposal.submission_time}</div>
    <Proposer>{proposal.proposal.proposer}</Proposer>

    <p>{proposal.proposal.description}</p>
    <div>
      Votes:
      {voteList}
    </div>
  </ProposalCard>
);
