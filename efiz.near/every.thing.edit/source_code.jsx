const path = props.path;
const blockHeight = props.blockHeight;

function handleSubmit(val) {
  const parts = path.split("/");
  const creatorId = parts[0];
  parts.shift(); // Remove the first element
  const newData = {
    [parts[0]]: {
      [parts[1]]: val.replace(/\n/g, ""),
    },
  };
  if (context.accountId === creatorId) {
    Social.set(newData, {
      force: true,
    });
  }
}

const thing = JSON.parse(Social.get(path, blockHeight) || "null");

if (thing) {
  return (
    <Widget
      src="efiz.near/widget/Every.Raw.Edit"
      props={{ value: thing, handleSubmit: handleSubmit }}
    />
  );
} else {
  return <p>thing not found</p>;
}
