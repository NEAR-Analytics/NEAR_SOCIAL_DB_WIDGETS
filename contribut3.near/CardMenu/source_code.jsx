const items = props.items ?? [];

const menuItems = items.reduce(
  (list, { text, icon, id }) => [
    ...list,
    list.length > 0 ? (
      <li>
        <hr className="dropdown-divider" />
      </li>
    ) : (
      <></>
    ),
    <li>
      <a className="dropdown-item" id={id}>
        <i className={icon} />
        <span>{text}</span>
      </a>
    </li>,
  ],
  []
);

const menuIcon = styled.a`
  &:before {
    content: "\f5d3" !important;
  }
`;

return (
  <div className="btn-group dropstart">
    <menuIcon
      className="btn btn-outline-secondary dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i className="bi-three-dots-vertical" />
    </menuIcon>

    <ul className="dropdown-menu">{menuItems}</ul>
  </div>
);
