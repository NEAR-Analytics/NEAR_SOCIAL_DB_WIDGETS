const icon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
      stroke="#667085"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const SearchInput = styled.input`
  display: block;
  padding: 0.5em;
  padding-left: 2em;
  border: 1px solid #d0d5dd;

  /* &:hover { */
  /*   border: 2px solid #d0d5dd; */
  /* } */
  /**/
  /* &:focus { */
  /*   border: 2px solid #d0d5dd; */
  /* } */
`;

const Icon = styled.div`
  position: absolute;
  inset: auto auto auto 2px;
`;

const Container = styled.div`
  position: relative;
`;

return (
  <Container>
    <Icon>{icon}</Icon>
    <SearchInput
      type="search"
      value={props.search}
      placeholder="Search"
      onChange={(e) => props.update({ search: e.target.value })}
    />
  </Container>
);
