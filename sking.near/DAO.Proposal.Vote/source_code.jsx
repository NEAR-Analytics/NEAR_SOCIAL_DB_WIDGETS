const accountId = context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";
const vote_counts = props.proposal.vote_counts ?? {
  // yes, no, spam
  community: [3, 0, 0],
  council: [1, 6, 0],
};

const alreadyVoted = props.proposal.votes[accountId];
const canVote = !alreadyVoted && props.proposal.status === "In Progress" && accountId;
const yesLost = props.proposal.status === "Failed";
const noLost = props.proposal.status === "Approved";

let totalYesVotes = 0;
let totalNoVotes = 0;
Object.keys(vote_counts).forEach((key) => {
  totalYesVotes += vote_counts[key][0];
  totalNoVotes += vote_counts[key][1];
});
const totalVotes = totalYesVotes + totalNoVotes;

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

const VoteButton = styled.button`
  border-radius: 20px;
  border: none;
  display: flex;
  padding: 0;
  position: relative;
  background: #f3f3f2;
  width: 100%;
  margin-bottom: 14px;
  cursor: default !important;

  .count {
    border-radius: 20px;
    padding: 12px 20px;
    text-align: left;
    font-weight: 600;
    font-size: 15px;
    min-width: 70px;
    transition: all 0.4s ease-in-out;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;

    &.yes {
      background-color: #59e692;
      color: #000;
      max-width: ${(totalYesVotes / totalVotes) * 100 || 0}%;

      ${yesLost &&
      `
        opacity: 0.5;
      `}
    }
    &.no {
      background-color: #e5484d;
      color: #fff;
      max-width: ${(totalNoVotes / totalVotes) * 100 || 0}%;

      ${noLost &&
      `
        opacity: 0.5;
      `}
    }
    .vote {
      opacity: 0;
      transition: all 0.4s ease-in-out;
      max-width: 0;
      display: block;
      margin-right: 3px;
    }
  }
  .votes {
    text-align: right;
    padding: 12px 16px;
    position: absolute;
    right: 0;
    top: 0;
    color: rgb(27, 27, 24);
  }
  

  ${canVote &&
    `
    &:hover .count, &:focus .count {
      max-width: 100%;
      cursor: pointer;
      .vote {
        opacity: 1;
        max-width: 100px;
      }
      &.yes {
        background-color: #70f2a4;
      }
      &.no {
        background-color: #f26f7e;
      }
    }`}
`;

return (
  <>
    <VoteButton onClick={handleApprove} disabled={!canVote}>
      <span className="count yes">
        <span className="vote">Vote </span> Yes
      </span>
      <span className="votes">{totalYesVotes} Votes</span>
    </VoteButton>
    <VoteButton onClick={handleReject} disabled={!canVote}>
      <span className="count no">
        <span className="vote">Vote </span> No
      </span>
      <span className="votes">{totalNoVotes} Votes</span>
    </VoteButton>
  </>
);
