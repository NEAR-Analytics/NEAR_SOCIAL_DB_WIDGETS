const items = props.items ?? [];

const DropdownDivider = styled.hr`
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  margin: 0.5em 0;
`;

const DropdownItem = styled.a`
  display: block;
  width: 100%;
  clear: both;
  padding: 0.5em 1em;
  font-weight: 400;
  white-space: nowrap;
  text-decoration: none;
  border-radius: 5px;
  color: black;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    color: black;
    text-decoration: none;
    background-color: #e9ecef;
  }
`;

const menuItems = items.reduce(
  (list, { text, icon, href, onClick }) => [
    ...list,
    list.length > 0 ? (
      <li>
        <DropdownDivider />
      </li>
    ) : (
      <></>
    ),
    <li>
      <DropdownItem onClick={onClick} {...(href ? { href } : {})}>
        <i className={icon} />
        <span>{text}</span>
      </DropdownItem>
    </li>,
  ],
  []
);

const DropdownList = styled.ul`
  position: absolute;
  inset: 0px 0px auto auto;
  margin: 0px;
  transform: translate(-44px, 0px) scale(${({ show }) => (show ? "1" : "0")});
`;

const MenuIcon = styled.a`
  &:before {
    display: none !important;
  }
`;

return (
  <div className="btn-group dropstart">
    <MenuIcon
      className="btn btn-outline-secondary dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i className="bi-three-dots-vertical" />
    </MenuIcon>

    <ul className="dropdown-menu">{menuItems}</ul>
  </div>
);
