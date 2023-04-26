const { widgetProvider, comps } = props;

const FilterMenu = styled.div`
  display: flex;
`;

return <FilterMenu>{comps.map((c) => c)}</FilterMenu>;
