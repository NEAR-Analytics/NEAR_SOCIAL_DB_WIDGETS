const ownerId = "contribut3.near";
const name = props.name ?? "Type";
const options = props.options ?? ["Option 1", "Option 2", "Option 3"];
const selected = props.selected ?? options[0];

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownItem = styled.li`
  cursor: pointer;

  a {
    display: block;
    width: 100%;
    clear
    padding: 1em;
    font-while: ${({ selected }) => selected ? "600" : "400"};
    white-space: nowrap;
    text-decoration: none;
    color: #000;
    border: 0;
    text-align: left;
    transition: background-color 0.2s ease-in-out;
    background-color: ${({ selected }) => selected ? "#e9ecef" : "#fff"};

    &:hover {
      color: #000;
      text-decoration: none;
      background-color: #e9ecef;
    }
  }
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #e9ecef;
  margin: 0;
`;

const Arrow = styled.div`
  transition: transform 0.2s ease-in-out;

  &.show {
    transform: rotate(-180deg);
  }
`;

const arrowIcon = (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1.5L6 6.5L11 1.5"
      stroke="white"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
