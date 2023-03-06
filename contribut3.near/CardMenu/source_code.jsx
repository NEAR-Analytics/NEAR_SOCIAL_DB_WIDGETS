const items = props.items ?? [];

State.init({
  show: false,
});

const DropdownDivider = styled.hr`
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  margin: 0;
`;

const DropdownItem = styled.a`
  display: block;
  width: 100%;
  clear: both;
  padding: 1em;
  font-weight: 400;
  white-space: nowrap;
  text-decoration: none;
  /* border-radius: 5px; */
  color: black;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    color: black;
    text-decoration: none;
    background-color: #e9ecef;
  }
`;

const DropdownLi = styled.li`
  mouse: pointer;
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
    <DropdownLi>
      <DropdownItem onClick={onClick} {...(href ? { href } : {})}>
        <i className={icon} />
        <span>{text}</span>
      </DropdownItem>
    </DropdownLi>,
  ],
  []
);

const DropdownList = styled.ul`
  z-index: 3;
  dislpay: block;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  list-style-type: none;
  position: absolute;
  inset: 0px 0px auto auto;
  padding: 0px;
  margin: 0px;
  transform: translate(-44px, 0px) scale(0);
  transition: transform 0.2s ease-in-out;
  transform-origin: top right;

  &.show {
    transform: translate(-44px, 0px) scale(1);
  }
`;

const MenuIcon = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5em;
  height: 2.5em;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
`;

return (
  <div
    className="btn-group dropstart"
    onBlur={() => State.update({ show: false })}
  >
    <MenuIcon
      // className="btn btn-outline-secondary dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      onClick={() => State.update({ show: !state.show })}
    >
      <i className="bi-three-dots-vertical" />
    </MenuIcon>

    <DropdownList className={state.show ? "show" : ""}>
      {menuItems}
    </DropdownList>
  </div>
);
