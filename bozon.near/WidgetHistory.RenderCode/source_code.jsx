const currentCode = Social.get(
  `${props.pathToWidget}`,
  props.currentBlockHeight
);

if (currentCode === null) return "Loading";

return (
  <div>
    <Widget code={currentCode} props={props} />
  </div>
);
