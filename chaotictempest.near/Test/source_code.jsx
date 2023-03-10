const facets = props.facets;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 48px;
  max-width: 600px;
  margin: 0 auto;
  overflow: scroll;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

return (
  <Wrapper>
    <Widget
      src="chaotictempest.near/widget/Facets"
      props={{
        facets,
        defaultFacet: facets[0],
      }}
    />
  </Wrapper>
);
