const path = props.path;
const blockHeight = props.blockHeight;
const parts = path.split("/");

const thing = JSON.parse(Social.get(path, blockHeight) || "null");
const type = thing.type;

return (
  <Widget
    src={"efiz.near/widget/creator"}
    props={{
      data: thing.data,
      type: type,
      thingId: parts[2],
    }}
  />
);
