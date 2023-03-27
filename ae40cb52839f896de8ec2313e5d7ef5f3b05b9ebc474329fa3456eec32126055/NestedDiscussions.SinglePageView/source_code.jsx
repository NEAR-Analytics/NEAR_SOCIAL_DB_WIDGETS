const accountId = props.accountId;
const blockHeight = parseInt(props.commentBlockHeight);
const dbAction = props.dbAction || "discussTEST";
const previewWidget =
  props.previewWidget ||
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Preview";

const item = {
  type: "social",
  path: `${accountId}/${dbAction}/main`,
  blockHeight,
};

let parentPost = null;

const content = JSON.parse(
  Social.get(`${accountId}/${dbAction}/main`, blockHeight) ?? "null"
);

return (
  <Widget
    src={previewWidget}
    props={{ identifier: item, commentsLimit: 30, subscribe: true }}
  />
);
