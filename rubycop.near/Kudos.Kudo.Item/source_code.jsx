const {
  id,
  accountId,
  requesterId,
  upvotes,
  description,
  tags,
  createdAt,
  isIAmHuman,
} = props;

const widget = {
  button: "rubycop.near/widget/NDC.StyledComponents",
  comment: "rubycop.near/widget/Kudos.Comment.Reply",
};

const Container = styled.div`
  border-radius: 10px;
  background: #F8F8F9;
  border: ${(props) => (props.canMint ? "2px solid #9333EA" : "")};

  @media (max-width: 768px) {
    background: #fff;
  }
`;

const InputField = styled.div`
  margin: 20px 0;
`;

const Mint = styled.div`
  padding: 10px 0;
  background: linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);
  border-radius: 8px 8px 0 0;
  font-size: 14px;

  span.gift {
    font-size: 20px;
  }
  b {
    margin-left: 5px;
    font-size: 16px;
  }

  p {
    margin-bottom: 0;
  }
`;

const VoteButton = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: ${(props) => (props.disabled ? "#C3CACE" : "#9333EA")};
  border: 1px solid #9333EA;
  border-color: ${(props) => (props.disabled ? "#C3CACE" : "")};
`;

const ShareButton = styled.button`
  padding: 2px 12px;
  border-radius: 8px;
  background: #fff;
  font-size: 12px;
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
  font-weight: 400;
  font-size: 14px;
  margin: 12px 0;
`;

const Tags = styled.div`
  font-size: 12px;
  margin-bottom: 12px;
`;

const CreatedAt = styled.div`
  font-size: 12px;
  font-style: italic;
  font-weight: 300;

  b {
    font-weight: 500;
  }
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
  font-size: 16px;
  margin-left: 5px;
`;

const Modal = styled.div`
  position: fixed;
  z-index: 101;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(128, 128, 128, 0.65);
`;

const ComponentWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalContent = styled.div`
  background: #F8F8F9;
  margin: 20% auto;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  
  @media (max-width: 768px) {
    width: 90%;
  }

  .content {
    margin: 18px 0; 
  }
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

const canMint = upvotes >= 5;
const handleMintSBT = () => {};
const handleCreateComment = (id, comment) => {};
const handleShare = () => {};

State.init({
  isOpen: false,
  comment: "",
});

const Content = () => (
  <ModalContent>
    <h4>Reply to comment</h4>
    <div className="content">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              accountId,
              imageClassName: "rounded-circle w-100 h-100",
              style: { width: "32px", height: "32px", marginRight: 5 },
            }}
          />
          <UserLink
            src={`https://wallet.near.org/profile/${accountId}`}
            title={accountId}
          />
        </div>
        <CreatedAt>
          <i className="bi bi-clock" />
          {date}
        </CreatedAt>
      </div>
      <Description className="text-secondary">{description}</Description>
      <InputField>
        <input
          type="text"
          value={state.comment}
          onChange={(e) => State.update({ comment: e.target.value })}
        />
      </InputField>
    </div>
    <div className="d-grid gap-3 d-flex align-items-center justify-content-end">
      <Widget
        src={widget.button}
        props={{
          Button: {
            text: "Cancel",
            className: "secondary",
            onClick: () => State.update({ isOpen: false }),
          },
        }}
      />
      <Widget
        src={widget.button}
        props={{
          Button: {
            text: "Submit",
            onClick: () => {
              State.update({ isOpen: false });
              handleCreateComment(id, comment);
            },
          },
        }}
      />
    </div>
  </ModalContent>
);

return (
  <>
    <Container canMint={canMint}>
      {canMint && (
        <Mint onClick={handleMintSBT}>
          <p className="text-white text-center align-items-center">
            <span className="gift">🎁</span>
            <b>Congratulations!</b>{" "}
            <i>Click on the gift box to mint your Proof of Kudos</i>
          </p>
        </Mint>
      )}
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center">
            <Widget
              src="mob.near/widget/ProfileImage"
              props={{
                accountId,
                imageClassName: "rounded-circle w-100 h-100",
                style: { width: "32px", height: "32px", marginRight: 5 },
              }}
            />
            <UserLink
              src={`https://wallet.near.org/profile/${accountId}`}
              title={accountId}
            />
          </div>
          {upvotes !== undefined && (
            <div className="d-flex justify-content-between align-items-center gap-2">
              <VoteButton onClick={handleVote} disabled={!isIAmHuman}>
                {upvotes}
                <Widget
                  src="mob.near/widget/Image"
                  props={{
                    image: {
                      url: isIAmHuman
                        ? "https://bafkreihtxbozr3tpmzyijzvgmnzjhfnvfudu5twxi5e736omfor6rrbcde.ipfs.nftstorage.link"
                        : "https://bafkreiew3fr6fxxw6p5zibr7my7ykdqyppblaldsudsnropawfkghjkhuu.ipfs.nftstorage.link",
                    },
                    style: {
                      height: "15px",
                      marginBottom: "3px",
                    },
                    alt: "kudos",
                    fallbackUrl:
                      "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
                  }}
                />
              </VoteButton>
            </div>
          )}
        </div>
        <Description className="text-secondary">{description}</Description>
        <Tags className="d-flex gap-2">
          {tags.map((tag) => (
            <Tag>#{tag}</Tag>
          ))}
        </Tags>
        <div className="d-flex justify-content-between align-items-center">
          <CreatedAt>
            <i className="bi bi-clock" />
            {getDateAgo()}
            {requesterId && (
              <>
                by <b>{requesterId}</b>
              </>
            )}
          </CreatedAt>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <ShareButton onClick={handleShare}>
              <i className="bi bi-share-fill" />
            </ShareButton>
            <Widget
              src="rubycop.near/widget/NDC.StyledComponents"
              props={{
                Button: {
                  text: "Reply",
                  // disabled: !isIAmHuman,
                  size: "sm",
                  icon: <i className="bi bi-arrow-90deg-left" />,
                  onClick: () => State.update({ isOpen: true }),
                },
              }}
            />
          </div>
        </div>
      </div>
    </Container>

    {state.isOpen && (
      <Modal isOpen={state.isOpen}>
        <ComponentWrapper>
          <Content />
        </ComponentWrapper>
      </Modal>
    )}
  </>
);
