// const accountId = props.accountId;
// const blockHeight = props.blockHeight;
const accountId =
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055";
const blockHeight = 84207156;

if (accountId === undefined || blockHeight === undefined) {
  return;
}

const item = props.item || {
  type: "social",
  path: `${accountId}/question/main`,
  blockHeight,
};

const link = `#/ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/DevSupport.Question.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

const likes = Social.index("answer", item);

const Replies = styled.a`
  color: #687076;
  &:hover {
    text-decoration: none
  }
`;

return (
  <Replies href={link}>
    <i class="bi bi-chat-left-dots" />
    &nbsp;{likes.length}&nbsp;replies
  </Replies>
);
