const path = props.path;
const blockHeight = props.blockHeight;

const thing = JSON.parse(Social.get(path, blockHeight) || "null");

if (!thing) {
  return <></>;
}

return <p>{JSON.stringify(thing)}</p>;
