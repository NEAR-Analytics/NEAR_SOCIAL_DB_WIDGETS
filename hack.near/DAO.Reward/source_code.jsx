const daoId = props.daoId ?? "multi.sputnik-dao.near";

const bounty = props.bounty ?? {
  id: 1,
  proposer: "hack.near",
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

const RenderBountyDetails = () => {
  if (proposal_type === "AddBounty")
    return (
      <>
        <div>
          <h5>Amount</h5>
          <p>
            {proposal.kind.AddBounty.bounty.amount}
            {proposal.kind.AddBounty.bounty.token_id === "" ? "NEAR" : ""}
          </p>
        </div>
        <div>
          <h5>Times</h5>
          <p>{proposal.kind.AddBounty.bounty.times}</p>
        </div>
        <div>
          <h5>Deadline</h5>
          <p>
            {new Date(
              proposal.kind.AddBounty.bounty.max_deadline
            ).toLocaleString()}
          </p>
        </div>
        <div>
          <h5>Bounty Description</h5>
          <p>{proposal.kind.AddBounty.bounty.description}</p>
        </div>
      </>
    );

  if (proposal_type === "BountyDone")
    return (
      <>
        <div>
          <h5>Receiver</h5>
          <Widget
            src="mob.near/widget/Profile.ShortInlineBlock"
            props={{
              accountId: proposal.kind.BountyDone.receiver_id,
              tooltip: true,
            }}
          />
        </div>
        <div>
          <h5>Bounty ID</h5>
          <p>{proposal.kind.BountyDone.bounty_id}</p>
        </div>
      </>
    );
};

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
      <h5>Description</h5>
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
