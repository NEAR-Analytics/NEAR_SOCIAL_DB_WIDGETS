const path = props.path;
const blockHeight = props.blockHeight;

const edges = Social.index("edges", path);

// This could be improved so it is cleaner and doesn't need to go through every.thing.view again
// every.edge.view?
return (
  <div>
    {edges?.map((it) => {
      return (
        <Widget
          src="efiz.near/widget/every.edge.view"
          props={{ path: it.value.path, blockHeight }}
        />
      );
    })}
  </div>
);
