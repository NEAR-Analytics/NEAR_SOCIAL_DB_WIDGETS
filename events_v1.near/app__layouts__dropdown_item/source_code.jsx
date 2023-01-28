const key = props.key || props.component.src;

console.log('LAYOUT', { props });

return (
  <li className="nav-item" key={key}>
    {props.__.engine.renderComponent(
      props.component.name,
      props.component.props,
      props.component.layout,
      props.component.layoutProps
    )}
  </li>
);
