State.init({
  selected: props.selected ?? {},
});

const facets = props.facets ?? ["facet0", "facet1", "facet2", "facet3"];
const multiSelect = props.multiSelect ?? true;
const onFacetClick = (i, facet) => {
  let selected = {};
  if (multiSelect) {
    selected = { ...state.selected };
  }
  if (i in selected) {
    delete selected[i];
  } else {
    selected[i] = facet;
  }

  if (props.debug) {
    console.log(`Clicked ${facet}`);
  }

  State.update({
    selected,
  });

  if (props.onFacetClick) {
    props.onFacetClick(facet);
  }

  if (multiSelect && props.onMultiFacetClick) {
    props.onMultiFacetClick({
      recentFacetClick: facet,
      selectedFacets: Object.values(selected),
    });
  }
};

const FacetContainer =
  props.facetContainerStyle ??
  styled.ul`
    display: flex;
    list-style-type: none;
`;

const FacetItem =
  props.facetItemStyle ??
  styled.li`
    padding: 0 14px 0 14px;
    border: 1px solid #D0D5DD !important;
    background: #FFFFFF;
    border-radius: 100px;

    height: 32px;
    text-align: center;
    margin: auto 4px;
    color: rgba(0, 0, 0, 0.87);
    display: flex;
    box-sizing: border-box;
    align-items: center;
    letter-spacing: 0.01071em;
    line-height: 1.43;
    font-size: 13px;
    min-width: 32px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
        cursor: pointer;
    }

    &.selected {
        background-color: rgba(0, 0, 0, 0.08);
    }
`;

return (
  <FacetContainer>
    {facets?.map((facet, index) => (
      <FacetItem
        className={index in (state.selected ?? {}) ? "selected" : ""}
        onClick={() => onFacetClick(index, facet)}
      >
        {facet}
      </FacetItem>
    ))}
  </FacetContainer>
);
