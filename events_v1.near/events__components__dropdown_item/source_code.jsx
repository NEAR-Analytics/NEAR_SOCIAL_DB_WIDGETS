props.controller.setLayout('dropdown-item', {});

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
  <DropdownButton
    aria-current="page"
    href=""
    onClick={(e) => {
      console.log('DropdownItem', props.label, 'onClick');
      console.log({ props });
      props.handleClick(e);
    }}
  >
    {props.label}
  </DropdownButton>
);
