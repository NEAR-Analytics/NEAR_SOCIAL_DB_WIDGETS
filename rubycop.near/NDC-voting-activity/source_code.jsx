const { myVotes } = props;

const VoteRow = styled.div`
  padding: 10px;
  small {
    font-weight: 400;
    font-size: 12px;
  }
  .info {
    padding-left: 10px;
  }
`;

const StyledLink = styled.a`
  color: inherit;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Badge = styled.div`
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
  border-radius: 100px;
`;

const List = styled.div`
  overflow-y: scroll;
  height: 300px;
`;

const getHumanTime = (time) => new Date(time).toLocaleTimeString();

return (
  <List>
    {myVotes.map((vote) => (
      <VoteRow className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              accountId: vote.candidateId,
              imageClassName: "rounded-circle w-100 h-100",
              style: { width: "32px", height: "32px", marginRight: 4 },
            }}
          />
          <div className="row info">
            <StyledLink
              href={`https://wallet.near.org/profile/${vote.candidateId}`}
            >
              {vote.candidateId}
            </StyledLink>
            <small className="text-secondary">{getHumanTime(vote.time)}</small>
          </div>
        </div>
        <Badge>{vote.typ}</Badge>
      </VoteRow>
    ))}
  </List>
);
