const type = props.type || "md";
const key = props.key || "main";

function postThing(data, notifications, hashtags) {
  // get the root thing from data
  const thing = data.index.thing;
  // get the thingId
  const thingId = JSON.parse(thing).key;
  // build the path
  const path = `${context.accountId}/thing/${thingId}`;
  // create a post referencing the thing
  data.post = {
    [key]: JSON.stringify({ path, type }),
  };
  // and tell the indexer to index the post
  data.index.post = JSON.stringify({
    key: key,
    value: {
      path,
      type,
    },
  });
  return data;
}

return (
  <Widget
    src="efiz.near/widget/Every.Thing.Create"
    props={{ type: type, postThing: postThing }}
  />
);
