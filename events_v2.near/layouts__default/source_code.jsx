return (
  <Widget
    src={props.__engine.widgetPathFromName(props.component.name)}
    props={props.component.props}
  />
);
