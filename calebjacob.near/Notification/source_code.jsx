const { type } = props.value;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  > *:first-child {
    border-right: 1px solid #ECEEF0;
    padding-right: 24px;
  }

  > *:last-child {
      margin-left: auto;
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
  color: #11181C !important;

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
      {type === "like" && <>Liked your post</>}
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

    {type === "like" && (
      <Button
        href={`/#/calebjacob.near/widget/PostPage?accountId=${props.acc}&blockHeight=85455129`}
      >
        View Post
      </Button>
    )}
  </Wrapper>
);

// return (
//   <div className="mb-3">
//     {value.type === "follow" || value.type === "unfollow" ? (
//       <Widget src="mob.near/widget/Notification.Item.Follow" props={props} />
//     ) : value.type === "poke" ? (
//       <Widget src="mob.near/widget/Notification.Item.Poke" props={props} />
//     ) : value.type === "like" ? (
//       <Widget src="mob.near/widget/Notification.Item.Like" props={props} />
//     ) : value.type === "comment" ? (
//       <Widget src="mob.near/widget/Notification.Item.Comment" props={props} />
//     ) : value.type && value.type?.startsWith("devgovgigs/") ? (
//       <Widget src="mob.near/widget/Notification.Item.DevGov" props={props} />
//     ) : value.type === "mention" ? (
//       <Widget src="mob.near/widget/Notification.Item.Mention" props={props} />
//     ) : (
//       <div>
//         Unknown notification:{" "}
//         <span className="font-monospace">{JSON.stringify(value)}</span>
//       </div>
//     )}
//   </div>
// );
