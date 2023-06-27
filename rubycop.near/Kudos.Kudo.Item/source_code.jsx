const { accountId, upvotes, description, tags, createdAt } = props;

const Container = styled.div`
  padding: 14px 16px;
  border-radius: 10px;
  background: #F8F8F9;

  @media (max-width: 768px) {
    background: #fff;
  }
`;

const VoteButton = styled.button`
  padding: 2px 12px;
  border-radius: 8px;
  background: #fff;
  font-size: 12px;
  font-family: Avenir;
  font-weight: 500;
  line-height: 24px;
  color: #9333EA;
  border: 1px solid #9333EA;
`;

const Description = styled.div`
  max-height: 100px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  margin: 12px 0;
`;

const Tags = styled.div`
  font-size: 10px;
  margin-bottom: 12px;
`;

const CreatedAt = styled.div`
  font-size: 12px;
  font-style: italic;
  font-weight: 300;
`;

const Tag = styled.div`
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 100px;
  color: #9333EA;
  border: 1px solid #9333EA;
  background: linear-gradient(90deg, rgba(147, 51, 234, 0.10) 0%, rgba(79, 70, 229, 0.10) 100%);
`;

const StyledLink = styled.a`
  color: inherit !important;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  margin-left: 5px;
`;

const UserLink = ({ title, src }) => (
  <>
    <StyledLink href={src}>{title}</StyledLink>
  </>
);

const getDateAgo = () => {
  const now = new Date().getTime();
  const current = new Date(parseInt(createdAt)).getTime();

  const diff = now - current;
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days > 0) return `${days} days ago`;
  if (hours > 0) return `${hours} hours ago`;
  if (minutes > 0) return `${minutes} minutes ago`;
  if (seconds > 0) return `${seconds} seconds ago`;

  return "";
};

const handleMintSBT = () => {};
const handleReply = () => {};

return (
  <Container>
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex justify-content-between align-items-center">
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            accountId,
            imageClassName: "rounded-circle w-100 h-100",
            style: { width: "24px", height: "24px", marginRight: 4 },
          }}
        />
        <UserLink
          src={`https://wallet.near.org/profile/${accountId}`}
          title={accountId}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <VoteButton onClick={handleVote}>
          {upvotes}
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: {
                url: "https://bafkreihtxbozr3tpmzyijzvgmnzjhfnvfudu5twxi5e736omfor6rrbcde.ipfs.nftstorage.link",
              },
              style: {
                height: "12px",
                marginBottom: "3px",
              },
              alt: "kudos",
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
            }}
          />
        </VoteButton>
        <Widget
          src="rubycop.near/widget/NDC.StyledComponents"
          props={{
            Button: {
              text: "Mint SBT",
              className: "primary dark",
              size: "sm",
              onClick: handleMintSBT,
            },
          }}
        />
      </div>
    </div>
    <Description className="text-secondary">{description}</Description>
    <Tags className="d-flex gap-2">
      {tags.map((tag) => (
        <Tag>#{tag}</Tag>
      ))}
    </Tags>
    <div className="d-flex justify-content-between align-items-center">
      <CreatedAt className="text-secondary">
        <i className="bi bi-clock" />
        {getDateAgo()}
      </CreatedAt>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <VoteButton onClick={handleVote}>
          <i className="bi bi-share-fill" />
        </VoteButton>
        <Widget
          src="rubycop.near/widget/NDC.StyledComponents"
          props={{
            Button: {
              text: "Reply",
              size: "sm",
              icon: <i className="bi bi-arrow-90deg-left" />,
              onClick: handleReply,
            },
          }}
        />
      </div>
    </div>
  </Container>
);
