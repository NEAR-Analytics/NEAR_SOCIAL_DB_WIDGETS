const Wrapper = styled.div`
`;
const SummaryWrapper = styled.div`
  margin-bottom: 32px;
`;
return (
  <Wrapper>
    <SummaryWrapper>
      <Widget
        src="ref-admin.near/widget/ComponentSummary"
        props={{
          primaryAction: "open",
          size: "large",
          showTags: false,
          src: "ref-admin.near/widget/xBox",
        }}
      />
    </SummaryWrapper>
    <Widget src="ref-admin.near/widget/xBox"></Widget>
  </Wrapper>
);
