console.log('COMPONENT', { props });
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

  &:hover {
    color: #007bff;
  }

  &:focus {
    color: #007bff;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background-color: #007bff;
    }
  }

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: transparent;
  }

  &.active {
    color: #007bff;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background-color: #007bff;

      transition: all 0.2s ease-in-out;
    }
  }

  &.active:hover {
    color: #007bff;
  }

  &.active:focus {
    color: #007bff;
  }

  &.active:focus::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: #007bff;
  }

  &.active:focus:hover {
    color: #007bff;
  }

  &.active:focus:hover::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: #007bff;
  }

  &.active:focus:hover:focus {
    color: #007bff;
  }
`;

return (
  <button
    className="nav-link"
    aria-current="page"
    href=""
    onClick={(e) => {
      e.preventDefault();
      props.onClick();
    }}
  >
    {props.label}
  </button>
);
