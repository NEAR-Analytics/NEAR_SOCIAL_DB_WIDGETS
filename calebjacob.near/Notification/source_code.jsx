const { value } = props;
const { type } = value;

const likedPost =
  type === "like" && value.item.path === `${context.accountId}/post/main`;
const likedComment =
  type === "like" && value.item.path === `${context.accountId}/post/comment`;
const postUrl = `/#/calebjacob.near/widget/PostPage?accountId=${context.accountId}&blockHeight=${props.blockHeight}`;
const supportedTypes = [
  "poke",
  "like",
  "follow",
  "unfollow",
  "comment",
  "mention",
];

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  > *:first-child {
    width: 200px;
    border-right: 1px solid #ECEEF0;
    padding-right: 24px;
  }

  > *:last-child {
    margin-left: auto;
  }

  .poke-button {
    color: #006ADC !important;
  }
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")} !important;
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};
  overflow-wrap: anywhere;

  b {
    font-weight: 600;
    color: #11181C;
  }
  
  &[href] {
    display: inline-flex;
    gap: 0.25rem;
    
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  height: 32px;
  border-radius: 100px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  background: #FBFCFD;
  border: 1px solid #D7DBDF;
  color: #006ADC !important;
  white-space: nowrap;

  &.button--primary {
    width: 100%;
    color: #006ADC !important;

    @media (max-width: 1200px) {
      width: auto;
    }
  }

  &:hover,
  &:focus {
    background: #ECEDEE;
    text-decoration: none;
    outline: none;
  }

  i {
    color: #7E868C;
  }

  .bi-16 {
    font-size: 16px;
  }
`;

console.log(props);

if (type && type.startsWith("devgovgigs/")) {
  return (
    <Widget src="mob.near/widget/Notification.Item.DevGov" props={props} />
  );
}

if (!supportedTypes.includes(type)) return <></>;

return (
  <Wrapper>
    <Widget
      src="calebjacob.near/widget/AccountProfile"
      props={{ accountId: props.accountId }}
    />

    <Text>
      {type === "follow" && <>Followed you</>}
      {type === "unfollow" && <>Unfollowed you</>}
      {type === "poke" && <>Poked you</>}
      {type === "like" && likedPost && <>Liked your post</>}
      {type === "like" && likedComment && <>Liked your comment</>}
      {type === "comment" && <>Commented on your post</>}
      {type === "mention" && <>Mentioned you</>}
      <Widget
        src="mob.near/widget/TimeAgo"
        props={{ blockHeight: props.blockHeight }}
      />{" "}
      ago
    </Text>

    {(type === "follow" || type === "unfollow") && (
      <Widget
        src="calebjacob.near/widget/FollowButton"
        props={{ accountId: props.accountId }}
      />
    )}

    {type === "poke" && (
      <Widget
        src="calebjacob.near/widget/PokeButton"
        props={{ accountId: props.accountId, back: true }}
      />
    )}

    {(type === "like" || type === "comment" || type === "mention") && (
      <Button href={postUrl}>View Post</Button>
    )}
  </Wrapper>
);
