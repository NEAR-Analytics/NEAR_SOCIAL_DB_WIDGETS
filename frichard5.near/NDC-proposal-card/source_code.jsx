const proposal = props.proposal;

const ProposalCard = styled.div`
  height: 300px;
  width: 80%;
  margin: 50px auto;
  box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
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

return (
  <ProposalCard>
    <div>Id:{proposal.proposal_id}</div>
    <div>Type:{proposal.type}</div>
    <div>Proposer:{proposal.proposal.proposer}</div>
    <div>Proposer:{proposal.status}</div>
    <p>{proposal.proposal.description}</p>
    <div>
      Votes:
      {voteList}
    </div>
  </ProposalCard>
);
