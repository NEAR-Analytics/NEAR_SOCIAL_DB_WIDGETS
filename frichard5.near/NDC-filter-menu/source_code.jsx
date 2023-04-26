const { widgetProvider, comps, filters, removeFilter } = props;

State.init({
  isOpen: false,
});

const FilterMenu = styled.div`
    display: flex;
    position: absolute;
    z-index: 1;
    background: white;
    width: 100%;
    padding: 20px;
    box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
`;

const handleFilterRemove = (filter) => {
  removeFilter(filter);
};

return (
  <>
    <button onClick={() => State.update({ isOpen: !state.isOpen })}>
      open
    </button>
    {filters &&
      filters.map((f) => <div onClick={() => handleFilterRemove(f)}>{f}</div>)}
    {state.isOpen && <FilterMenu>{comps.map((c) => c)}</FilterMenu>}
  </>
);
