const type = "efiz.near/type/document";

function postThing(data) {
  // get the root thing from data
  const thing = data.index.thing;
  // get the key (thing Id)
  const key = JSON.parse(thing).key;
  // build the path
  const path = `${context.accountId}/thing/${key}`;
  // create a post referencing the thing
  data.post = {
    main: JSON.stringify({ path, type }),
  };
  // and tell the indexer to index the post
  data.index.post = JSON.stringify({
    key: "main",
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
