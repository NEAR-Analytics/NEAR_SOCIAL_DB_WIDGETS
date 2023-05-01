const Container = styled.div`
`;
const Wrap = styled.div`
  display:flex;
  justify-content:center;
  gap:24px;
  margin-top:20px;
`;
const SummaryWrapper = styled.div`
  margin-bottom: 50px;
`;
const Title = styled.h1`
  font-size: ${(p) => sizes[p.size].title};
  color: #fff;
  margin: 0 0 8px;
  font-weight: 500;

  @media (max-width: 770px) {
    font-size: 16px;
    margin: 0;
  }
`;
return (
  <Container>
    <SummaryWrapper>
      <Widget
        src="ref-admin.near/widget/ComponentBanner"
        props={{
          size: "large",
          src: "ref-admin.near/widget/xBox",
        }}
      />
    </SummaryWrapper>
    <Wrap>
      <Widget src="ref-admin.near/widget/LiNEAR"></Widget>
      <Widget src="ref-admin.near/widget/XREF"></Widget>
    </Wrap>
  </Container>
);
