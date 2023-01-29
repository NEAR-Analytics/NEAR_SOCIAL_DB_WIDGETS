const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: black;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  margin: 0;
  margin-right: 1rem;
`;

return (
  <li className="nav-item" key={props.key}>
    <DropdownButton
      aria-current="page"
      href=""
      onClick={(e) => {
        console.log('DropdownItem onClick', e);
        props.onClick(e);
        console.log('DropdownItem onClick after', props.onClick);
      }}
    >
      {props.label}
    </DropdownButton>
  </li>
);
