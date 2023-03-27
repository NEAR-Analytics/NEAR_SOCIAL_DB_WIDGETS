const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);
const dbAction = props.dbAction || "discussTEST";
const previewWidget =
  props.previewWidget ||
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Preview";

const item = {
  type: "social",
  path: `${accountId}/${dbAction}/main`,
  blockHeight,
};

const content = JSON.parse(
  Social.get(`${accountId}/${dbAction}/main`, blockHeight) ??
    '{"content": null}'
).content;

return content;

return (
  <Widget
    src={previewWidget}
    props={{ identifier: item, commentsLimit: 30, subscribe: true }}
  />
);
