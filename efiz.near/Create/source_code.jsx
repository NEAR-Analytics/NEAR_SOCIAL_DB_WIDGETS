State.init({
  created: false,
});

function composeData() {
  const data = {
    thing: {
      core: {
        data: {
          name: "",
          navigation: [
            {
              name: "kanban",
              src: "every.near/thing/kanban",
            },
            {
              name: "social",
              src: "every.near/thing/feed",
            },
          ],
        },
        type: "efiz.near/type/core",
      },
    },
  };
  return data;
}

function Thing() {
  // Renders the path according to type (VM doesn't offer switch-case w/ default)
  if (type === "widget") {
    // TODO: Verify that props are passed
    // How to allow user to lock at a specific height?
    return <Widget src={path} props={props} />;
  }
  if (type === "settings") {
    // Standardize path to {accountId}/settings/**
    parts.splice(2);
    parts.push("**");
    path = parts.join("/");
    return (
      <Widget
        src="efiz.near/widget/Every.Setting"
        props={{ path, blockHeight }}
      />
    );
  }
  if (type === "thing") {
    // get the thing data
    const thing = Social.get(path, blockHeight);
    thing = JSON.parse(thing || "null");
    type = thing.type || null;
    // get the type data
    const type = JSON.parse(Social.get(type, blockHeight) || "null");
    if (type === null) {
      console.log(`edge case: thing ${path} had an invalid type: ${thingType}`);
    }
    // get the widget to render this thing
    const widgetSrc = type?.widgets?.view;
    return (
      <Widget src={widgetSrc} props={{ data: thing.data, path, blockHeight }} />
    );
  }
  // DEFAULT:
  return <p>The type: {type} is not yet supported.</p>;
}

return (
  <>
    {state.created ? (
      <></>
    ) : (
      <CommitButton
        force
        data={composeData}
        onCommit={() => console.log("hello")}
      >
        create something
      </CommitButton>
    )}
  </>
);
