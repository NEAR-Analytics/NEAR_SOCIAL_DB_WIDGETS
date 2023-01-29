const DropdownButton = styled.div`
  background-color: transparent;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  margin: 0;
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
