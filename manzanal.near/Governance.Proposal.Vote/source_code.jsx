const accountId = context.accountId;
const daoId = props.daoId ?? "metapool.sputnik-dao.near";
const vote_counts = props.proposal.vote_counts ?? {
  // yes, no, abstain
  community: [5, 1, 2],
  council: [2, 4, 9],
};

const userVote = props.proposal.votes[accountId];
const canVote =
  true || (!userVote && props.proposal.status === "In Progress" && accountId);
const yesWin = props.proposal.status === "Approved";
const noWin = props.proposal.status === "Rejected";

let totalYesVotes = 0;
let totalNoVotes = 0;
let totalAbstainVotes = 0;
Object.keys(vote_counts).forEach((key) => {
  totalYesVotes += vote_counts[key][0];
  totalNoVotes += vote_counts[key][1];
  totalAbstainVotes += vote_counts[key][2];
});
const totalVotes = totalYesVotes + totalNoVotes + totalAbstainVotes;

// Functions

const handleApprove = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "act_proposal",
      args: {
        id: JSON.parse(props.proposal.id),
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
        id: JSON.parse(props.proposal.id),
        action: "VoteReject",
      },
      gas: 200000000000000,
    },
  ]);
};

const handleAbstain = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "act_proposal",
      args: {
        id: JSON.parse(props.proposal.id),
        action: "VoteRemove",
      },
      gas: 200000000000000,
    },
  ]);
};

const VoteButton = styled.button`
  border-radius: 20px;
  border: none;
  display: flex;
  padding: 0;
  position: relative;
  background: #f3f3f2;
  width: 100%;
  margin-bottom: 14px;
  cursor: pointer;

  .button {
    border-radius: 20px;
    padding: 12px 20px;
    text-align: left;
    font-weight: 600;
    font-size: 15px;
    transition: all 0.4s ease-in-out;
    text-align: center;
    display: flex;
    justify-content: center;
    min-width: 90px;
    width: 90px;

    @media (max-width: 600px) {
      justify-content: start;
    }
  }

  .vote {
    opacity: 0;
    transition: all 0.4s ease-in-out;
    max-width: 0;
    display: block;
    margin-right: 3px;
    position: relative;
    z-index: 1;
  }

  .votes {
    text-align: right;
    padding: 12px 16px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    color: rgb(27, 27, 24);
  }

  .preview {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 20px;
    transition: all 0.4s ease-in-out;
    z-index: 0;
  }

  &:hover {
    .button {
      width: 100%;
    }
    .vote {
      opacity: 1;
      max-width: 100px;
    }
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.8;

    .vote {
      opacity: 0;
      max-width: 0;
    }

    &.yes .button {
      width: ${(totalYesVotes / totalVotes) * 100 || 0}%;
    }
    &.no .button {
      width: ${(totalNoVotes / totalVotes) * 100 || 0}%;
    }
    &.abstain .button {
      width: ${(totalAbstainVotes / totalVotes) * 100 || 0}%;
    }
  }

  &.yes {
    .button {
      background-color: #59e692;
      color: #000;
    }
    .preview {
      background-color: #59e69220;
      width: ${(totalYesVotes / totalVotes) * 100 || 0}%;
    }
  }

  &.no {
    .button {
      background-color: #e5484d;
      color: #fff;
    }
    .preview {
      background-color: #e5484d20;
      width: ${(totalNoVotes / totalVotes) * 100 || 0}%;
    }
  }

  &.abstain {
    .button {
      background-color: #ffda09;
      color: #000;
    }
    .preview {
      background-color: #ffda0920;
      width: ${(totalAbstainVotes / totalVotes) * 100 || 0}%;
    }
  }
`;

return (
  <>
    <VoteButton onClick={handleApprove} disabled={!canVote} className="yes">
      <span className="button">
        <span className="vote">Vote </span> Yes
      </span>
      <span className="votes">
        <span className="preview" />
        {totalYesVotes} Votes (
        {Math.round((totalYesVotes / totalVotes) * 100 || 0)}%)
      </span>
    </VoteButton>
    <VoteButton onClick={handleReject} disabled={!canVote} className="no">
      <span className="button no">
        <span className="vote">Vote </span> No
      </span>
      <span className="votes">
        <span className="preview" />
        {totalNoVotes} Votes (
        {Math.round((totalNoVotes / totalVotes) * 100 || 0)}%)
      </span>
    </VoteButton>
    <VoteButton onClick={handleAbstain} disabled={!canVote} className="abstain">
      <span className="button abstain">
        <span className="vote">Vote </span> Abstain
      </span>
      <span className="votes">
        <span className="preview" />
        {totalAbstainVotes} Votes (
        {Math.round((totalAbstainVotes / totalVotes) * 100 || 0)}%)
      </span>
    </VoteButton>
  </>
);
