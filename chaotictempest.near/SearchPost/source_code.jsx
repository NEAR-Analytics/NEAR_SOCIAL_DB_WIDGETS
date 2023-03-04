const content = props.content;
const accountId = props.accountId;
const blockHeight = props.blockHeight;
const key = props.key ?? JSON.stringify(content);

const Post =
  props.postStyle ??
  styled.div`
  border-bottom: 1px solid #ECEEF0;
  padding: 24px 0 12px;

  @media (max-width: 1200px) {
    padding: 12px 0 0;
  }
`;

return (
  <Post className="post" key={key}>
    <Widget
      src="calebjacob.near/widget/Posts.Post"
      props={{ accountId, blockHeight, content }}
    />
  </Post>
);
