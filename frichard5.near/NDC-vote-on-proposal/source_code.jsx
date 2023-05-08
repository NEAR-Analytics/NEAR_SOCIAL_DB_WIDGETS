const { daoId, proposal_id, widgetProvider } = props;

const handleApprove = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "act_proposal",
      args: {
        id: JSON.parse(proposal_id),
        action: "VoteApprove",
      },
      gas: 300000000000000,
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
      gas: 300000000000000,
    },
  ]);
};

const Label = styled.span`
  color:#8c8c8c;
  font-size: 11px;
`;

return (
  <>
    <Label>Approve or reject the proposal {proposal_id}</Label>
    <div>
      <a className="btn btn-outline-success" onClick={handleApprove}>
        Approve
      </a>
      <a className="btn btn-outline-danger" onClick={handleReject}>
        Reject
      </a>
    </div>
  </>
);
