const facets = props.facets ?? ["facet0", "facet1", "facet2", "facet3"];
const onFacetClick =
  props.onFacetClick ??
  ((facet) => {
    if (props.debug) {
      console.log(`Clicked ${facet}`);
    }
  });

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

    &.dots:hover {
        background-color: transparent;
        cursor: default;
    }
    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
        cursor: pointer;
    }

    &.selected {
        background-color: rgba(0, 0, 0, 0.08);
    }

    .arrow {
        &::before {
        position: relative;
        /* top: 3pt; Uncomment this to lower the icons as requested in comments*/
        content: '';
        /* By using an em scale, the arrows will size with the font */
        display: inline-block;
        width: 0.4em;
        height: 0.4em;
        border-right: 0.12em solid rgba(0, 0, 0, 0.87);
        border-top: 0.12em solid rgba(0, 0, 0, 0.87);
        }

        &.left {
        transform: rotate(-135deg) translate(-50%);
        }

        &.right {
        transform: rotate(45deg);
        }
    }

    &.disabled {
        pointer-events: none;

        .arrow::before {
        border-right: 0.12em solid rgba(0, 0, 0, 0.43);
        border-top: 0.12em solid rgba(0, 0, 0, 0.43);
        }

        &:hover {
        background-color: transparent;
        cursor: default;
        }
    }
`;

return (
  <FacetContainer>
    {facets?.map((facet) => (
      <FacetItem onClick={() => onFacetClick(facet)}>{facet}</FacetItem>
    ))}
  </FacetContainer>
);
