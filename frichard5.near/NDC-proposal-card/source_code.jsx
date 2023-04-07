const proposal = props.proposal;

const ProposalCard = styled.div`
  height: 300px;
  width: 80%;
  margin: 50px 0px;
  box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
`;

return <ProposalCard>{proposal.proposal_id}</ProposalCard>;
