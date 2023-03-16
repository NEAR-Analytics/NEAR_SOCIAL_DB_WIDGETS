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

return (
  <a href={link} class="ms-3">
    <i class={`bi bi-chat`}> </i> Answers [{likes.length}]
  </a>
);
