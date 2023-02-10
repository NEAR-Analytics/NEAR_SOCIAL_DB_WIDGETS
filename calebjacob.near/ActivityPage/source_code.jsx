const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 284px 1fr 284px;
  grid-gap: 16px;
`;

const Sidebar = styled.div`
  padding-top: 24px;
`;

const Main = styled.div`
  padding-top: 24px;
  border-left: 1px solid #ECEEF0;
  border-right: 1px solid #ECEEF0;
`;

return (
  <Wrapper>
    <Sidebar>
      <Widget src="calebjacob.near/widget/LatestApps" />
    </Sidebar>
    <Main>
      <Widget src="calebjacob.near/widget/Activity" />
    </Main>
    <Sidebar>
      <Widget src="calebjacob.near/widget/CustomWidgetDisplay" />
    </Sidebar>
  </Wrapper>
);
