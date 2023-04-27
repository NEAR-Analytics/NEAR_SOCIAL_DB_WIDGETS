const { widgetProvider, comps, filters, removeFilter, resetFilters } = props;

State.init({
  isOpen: false,
  filters,
});

const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  arr1.sort();
  arr2.sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
};

if (filters && state.filters) {
}

const FilterMenu = styled.div`
    display: flex;
    position: absolute;
    z-index: 1;
    background: white;
    width: fit-content;
    padding: 20px;
    box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
    border-radius: 4px;
`;

const FilterButton = styled.button`
  color: black;
  background:rgba(255, 213, 13, 0.5);
  border: none;
  border-radius: 4px;
  &:hover {
    background:rgba(255, 213, 13, 1);
    color: black;
  }
  &:active {
      background-color:rgba(255, 213, 13, 0.8);
      color: black !important;
  }
`;

const FilterTag = styled.div`
  display: flex;
  align-items:center;
  span {
    margin-right: 10px;
  }
  svg {
    cursor: pointer;
  }
  border: 1px solid rgb(140, 140, 140);
  width: fit-content;
  border-radius: 4px;
  padding: 4px;
  margin: 5px;
`;

const FilterTagsContainer = styled.div`
    display: flex;
    padding: 10px;
`;

const ResetAllButton = styled.button`
    background: transparent;
    border: none;
    color: rgba(68, 152, 224, 1);
    text-decoration: underline;
`;

const handleResetFilters = () => {
  resetFilters();
};

const handleFilterRemove = (filter) => {
  removeFilter(filter);
};

return (
  <>
    <FilterButton onClick={() => State.update({ isOpen: !state.isOpen })}>
      <span>Filters</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 13h4.667v-1.5H2V13zm0-9v1.5h12V4H2zm0 5.25h8.333v-1.5H2v1.5z"
          fill="currentColor"
        ></path>
      </svg>
    </FilterButton>
    {filters && filters.length && (
      <FilterTagsContainer>
        {filters.map((f) => (
          <FilterTag>
            <span>{f}</span>
            <svg
              height="20px"
              class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="CloseIcon"
              onClick={() => handleFilterRemove(f)}
            >
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
          </FilterTag>
        ))}
        {filters.length ? (
          <ResetAllButton onClick={handleResetFilters}>
            Reset All
          </ResetAllButton>
        ) : (
          ""
        )}
      </FilterTagsContainer>
    )}
    {state.isOpen && comps.length && (
      <FilterMenu>{comps.map((c) => c)}</FilterMenu>
    )}
  </>
);
