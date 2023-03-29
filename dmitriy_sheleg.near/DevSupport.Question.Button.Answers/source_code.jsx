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

const link = `#/dmitriy_sheleg.near/widget/DevSupport.Question.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

const likes = Social.index("answer", item);

const Replies = styled.a`
  display: inline-flex;
  align-items: center;
  color: #687076;
  transition: color .15s ease;

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
