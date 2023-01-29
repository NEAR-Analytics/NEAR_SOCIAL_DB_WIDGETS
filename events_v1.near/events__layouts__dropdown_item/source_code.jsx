const key = props.key || props.component.src;

return (
  <li className="nav-item" key={key}>
    {props.__engine.renderComponent(
      props.component.name,
      props.component.props
    )}
  </li>
);
