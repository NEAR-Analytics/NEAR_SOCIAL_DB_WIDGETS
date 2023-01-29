// return props.__engine.renderComponent(
//   props.component.name,
//   props.component.props
// );

return <Widget src={props.__engine.widgetPathFromName(props.component.name)} props={
  props.component.props,

} />;
