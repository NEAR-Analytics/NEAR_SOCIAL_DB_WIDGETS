const ownerId = "contribut3.near";

const availableContent = ["overview", "requests", "people", "funding", "history", "graduation"];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "overview";
  }

  return content;
};

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1em;
  width: 100%;
`;

const HeaderDetails = styled.div`
  width: 80%;
`;

const HeaderProgress = styled.div`
  width: 20%;
`;

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
  padding-top: .25em;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 20%;
`;

return (
  <ContentContainer>
    <MainContent>
      <Widget
        src={`${ownerId}/widget/TabSelector`}
        props={{
          tab: "project",
          content: getContent(props.content),
          search: props.search,
          update: props.update,
          buttons: [
            {
              id: "overview",
              text: "Overview",
            },
            {
              id: "requests",
              text: "Requests",
            },
            {
              id: "people",
              text: "People",
            },
            {
              id: "funding",
              text: "Funding",
            },
            {
              id: "history",
              text: "Work history",
            },
            {
              id: "graduation",
              text: "Graduation",
            },
          ],
        }}
      />
      <Widget
        src={`${ownerId}/widget/Project.About`}
        props={{
          onSave: (s) => {
            console.log(s);
          },
        }}
      />
    </MainContent>
    <Sidebar>
      <Widget
        src={`${ownerId}/widget/Project.Sidebar`}
        props={{
          accountId: "contribut3.near",
          onSave: (s) => {
            console.log(s);
          },
        }}
      />
    </Sidebar>
  </ContentContainer>
);
