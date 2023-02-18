const { value } = props;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

console.log(props);

return <Wrapper>hello</Wrapper>;

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
