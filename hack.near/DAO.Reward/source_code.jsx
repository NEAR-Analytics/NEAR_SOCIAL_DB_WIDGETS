const daoId = props.daoId ?? "multi.sputnik-dao.near";

const bounty = props.bounty ?? {
  id: 1,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut pharetra orci. Aliquam vitae enim tincidunt sapien fermentum scelerisque.",
};

// ==============================
// Functions
// ==============================

const handleClaim = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "bounty_claim",
      args: {
        id: JSON.parse(bounty.id),
      },
      gas: 150000000000000,
    },
  ]);
};

const handleUnclaim = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "bounty_giveup",
      args: {
        id: JSON.parse(bounty.id),
      },
      gas: 150000000000000,
    },
  ]);
};

// ==============================
// Styled Components
// ==============================

const Wrapper = styled.div`
  margin: 16px auto;
  max-width: 800px;
  background-color: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  p {
    line-height: 1.4;
    font-weight: 400;
    font-size: 15px;
    color: #868682;
    margin: 0;
  }

  h3 {
    font-weight: 600;
    font-size: 24px;
    color: #1b1b18;
  }

  h5 {
    font-size: 12px;
    font-weight: 400;
    line-height: 1.2;
    color: #6c757d;
  }

  .status {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
    color: ${statusColor};
  }
`;

return (
  <Wrapper>
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <h5>Bounty ID: {bounty.id}</h5>
      </div>
    </div>
    <div>
      <h5>Proposer</h5>
      <Widget
        src="mob.near/widget/Profile.ShortInlineBlock"
        props={{ accountId: bounty.proposer, tooltip: true }}
      />
    </div>
    <div>
      <h5>Amount</h5>
      <p>
        {bounty.amount}
        {bounty.token_id === "" ? "NEAR" : ""}
      </p>
    </div>
    <div>
      <h5>Times</h5>
      <p>{bounty.times}</p>
    </div>
    <div>
      <h5>Deadline</h5>
      <p>{new Date(bounty.max_deadline).toLocaleString()}</p>
    </div>
    <div>
      <h5>Bounty Description</h5>
      <p>{bounty.description}</p>
    </div>
    <div className="d-flex gap-5 flex-wrap align-items-center"></div>
    <a className="btn btn-outline-success" onClick={handleClaim}>
      Claim
    </a>
    <a className="btn btn-outline-danger" onClick={handleUnclaim}>
      Unclaim
    </a>
  </Wrapper>
);
