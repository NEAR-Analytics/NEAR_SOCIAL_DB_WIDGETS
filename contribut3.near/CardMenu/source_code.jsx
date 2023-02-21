const items = props.items ?? [];

const buttonAction = ({ text, icon, id }) => (
  <li>
    <a className="dropdown-item" id={id}>
      <i className={icon} />
      <span>{text}</span>
    </a>
  </li>
);

const menuItems = items.reduce((list, itemProps) => {
  if (list.length > 0) {
    return [
      ...list,
      <li>
        <hr className="dropdown-divider" />
      </li>,
      buttonAction(itemProps),
    ];
  }

  return [buttonAction(itemProps)];
}, []);

return (
  <div className="btn-group dropstart">
    <a
      className="btn btn-outline-secondary dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {/* <i className="bi-three-dots-vertical" /> */}
    </a>

    <ul className="dropdown-menu">{menuItems}</ul>
  </div>
);
