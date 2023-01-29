const key = props.key || props.component.src;

return (
  <li className="nav-item" key={key}>
    {props.__engine.renderComponent(
      props.__component.name,
      props.__component.props
    )}
  </li>
);
