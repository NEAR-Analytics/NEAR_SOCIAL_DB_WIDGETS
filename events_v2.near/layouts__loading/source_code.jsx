return (
  <>
    {props.__engine.renderComponent(
      props.component.name,
      props.component.props
    )}
  </>
);
