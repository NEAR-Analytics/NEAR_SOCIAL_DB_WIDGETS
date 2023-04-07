const ownerId = "contribut3.near";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 80%;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 20%;
`;

return (<ContentContainer>
  <MainContent>
    <Widget src={`${ownerId}/widget/Project.About`} props={{ onSave: (s) => { console.log(s) } }} />
  </MainContent>
  <Sidebar>
    <Widget src={`${ownerId}/widget/Project.Sidebar`} props={{ onSave: (s) => { console.log(s) } }} />
  </Sidebar>
</ContentContainer>);
