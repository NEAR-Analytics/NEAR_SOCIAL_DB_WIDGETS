const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);

const content = JSON.parse(
  Social.get(`${accountId}/post/comment`, blockHeight) ?? "null"
);
if (content === null) {
  return "Loading";
}
const item = content.item;

const extractParentPost = (item) => {
  if (!item || item.type !== "social" || !item.path || !item.blockHeight) {
    return undefined;
  }
  const accountId = item.path.split("/")[0];
  return `${accountId}/post/main` === item.path
    ? { accountId, blockHeight: item.blockHeight }
    : undefined;
};

const parentPost = extractParentPost(item);
return parentPost ? (
  <Widget
    src="flatirons.near/widget/MainPage.Post"
    props={{
      ...parentPost,
      highlightComment: { accountId, blockHeight },
      commentsLimit: 30,
      subscribe: true,
      raw: props.raw,
    }}
  />
) : (
  <Widget src="flatirons.near/widget/MainPage.Comment" props={props} />
);
