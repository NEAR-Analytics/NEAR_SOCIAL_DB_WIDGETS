const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);
const dbAction = props.dbAction || "discussTEST";
const previewWidget =
  props.previewWidget ||
  "ae40cb52839f896de8ec2313e5d7ef5f3b05b9ebc474329fa3456eec32126055/widget/NestedDiscussions.Preview";

return (
  <Widget
    src={previewWidget}
    props={{ identifier, accountId, blockHeight, dbAction }}
  />
);
