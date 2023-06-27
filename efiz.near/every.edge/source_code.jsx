const path = props.path;
const blockHeight = props.blockHeight;

const edges = Social.index("edges", path);

return (
  <div>
    {edges?.map((it) => {
      return (
        <Widget
          src="efiz.near/widget/every.thing.view"
          props={{ path: it.value.path, blockHeight }}
        />
      );
    })}
  </div>
);
