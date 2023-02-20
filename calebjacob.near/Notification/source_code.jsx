const { value } = props;
const { type } = value;
const path = value.item.path || "";

const postOwnerAccountId = path.split("/")[0] || context.accountId;
const isComment = path.indexOf("/post/comment") > 0 || type === "comment";
const isPost = !isComment && path.indexOf("/post/main") > 0;
const likedPost = type === "like" && isPost;
const likedComment = type === "like" && isComment;
const postUrl = `/#/calebjacob.near/widget/PostPage?accountId=${postOwnerAccountId}&${
  isComment ? "commentBlockHeight" : "blockHeight"
}=${value.item.blockHeight || props.blockHeight}`;

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
  border: 1px solid #ECEEF0;
  padding: 12px;
  border-radius: 6px;
  transition: background-color 200ms;

  &:hover {
    background: #eefeef;
  }

  > *:first-child {
    width: 200px;
    border-right: 1px solid #ECEEF0;
    padding-right: 24px;
  }

  > *:last-child {
    margin-left: auto;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: start;
    gap: 8px;

    > *:first-child {
      width: 100%;
      border-right: none;
      padding-right: 0;
    }

    > *:last-child {
      margin-left: 0;
    }
  }
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")} !important;
  font-weight: 400;
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
    font-weight: 600;
    color: #006ADC !important;
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

if (type && type.startsWith("devgovgigs/")) {
  return (
    <Widget src="mob.near/widget/Notification.Item.DevGov" props={props} />
  );
}

if (!supportedTypes.includes(type)) return <></>;

return (
  <Wrapper>
    <div>
      <Widget
        src="calebjacob.near/widget/AccountProfile"
        props={{ accountId: props.accountId }}
      />
    </div>

    <Text bold>
      {type === "follow" && <>Followed you</>}
      {type === "unfollow" && <>Unfollowed you</>}
      {type === "poke" && <>Poked you</>}
      <Text as="a" href={postUrl}>
        {type === "like" && likedPost && <>Liked your post</>}
        {type === "like" && likedComment && <>Liked your comment</>}
        {type === "comment" && <>Commented on your post</>}
        {type === "mention" && <>Mentioned you</>}
      </Text>
      <Widget
        src="mob.near/widget/TimeAgo"
        props={{ blockHeight: props.blockHeight }}
      />{" "}
      ago
    </Text>

    <div>
      {(type === "follow" || type === "unfollow") && (
        <Widget
          src="calebjacob.near/widget/FollowButton"
          props={{ accountId: props.accountId }}
        />
      )}

      {type === "poke" && (
        <Widget
          src="calebjacob.near/widget/PokeButton"
          props={{ accountId: props.accountId, back: true, primary: true }}
        />
      )}

      {(type === "like" || type === "comment" || type === "mention") && (
        <Button href={postUrl}>View {isComment ? "Comment" : "Post"}</Button>
      )}
    </div>
  </Wrapper>
);
