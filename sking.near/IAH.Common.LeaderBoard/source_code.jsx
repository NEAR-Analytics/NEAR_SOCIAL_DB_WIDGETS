const accountId = props.accountId ?? context.accountId;
const NFT_CONTRACT = props.NFT_CONTRACT;

const leaderboard = Near.view(
  NFT_CONTRACT,
  "referrals_leaderboard",
  {
    from_index: 0,
    limit: 100,
  },
  undefined,
  false
);
console.log("leaderboard", leaderboard, NFT_CONTRACT);

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #08cc86;
  &:last-child {
    border-bottom: none;
  }

  .rank {
    width: 30px;
  }
  .user {
    flex: 1;
    text-align: left;
    margin: 0 16px;
    color: #08cc86;
    text-decoration: none;
  }
`;

const Row = ({ accountId, score, rank }) => (
  <RowWrapper>
    <div className="rank">{rank}</div>
    <a
      className="user"
      href={`#/near/widget/ProfilePage?accountId=${accountId}`}
    >
      {accountId}
    </a>
    <div>{score}</div>
  </RowWrapper>
);

const Wrapper = styled.div`
  border: 2px solid #08cc86;
  color: #08cc86;
  display: flex;
  flex-direction: column;
  padding: 28px;
  margin: 0 10px auto;
  width: 100%;
  max-width: 500px;
  border-radius: 18px;
  flex: 1;
`;

return (
  <Wrapper>
    <h3 className="text-center mb-3">Referral Leaderboard</h3>
    {leaderboard.map((row, i) => (
      <Row
        key={i}
        rank={i + 1}
        accountId={row.account_id}
        score={row.count}
      />
    ))}
  </Wrapper>
);
