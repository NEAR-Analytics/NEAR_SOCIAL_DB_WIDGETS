const type = props.type || "efiz.near/type/document";

function postThing(data) {
  // get the main thing from index
  const thing = data.index.thing;
  const key = JSON.parse(thing).key;
  const path = `${context.accountId}/thing/${key}`;
  data.index.post = JSON.stringify({
    key: "main",
    value: {
      path,
      type,
    },
  });
  data.post = {
    main: JSON.stringify({ path, type }),
  };

  return data;
}

return (
  <Widget
    src="efiz.near/widget/Every.Thing.Create"
    props={{ type: type, postThing: postThing }}
  />
);
