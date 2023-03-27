const accountId = props.accountId;
const blockHeight = props.blockHeight;

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
  display: inline-flex;
  align-items: center;
  color: #687076;
  padding: .25rem .5rem;
  
  &:hover {
    text-decoration: none;
    color: #30A46C;
  }

  i {
    display: block;
    padding-top: .3rem;
  }
`;

return (
  <Replies href={link}>
    <i class="bi bi-chat-left-dots me-2" />
    {likes.length}&nbsp;replies
  </Replies>
);
