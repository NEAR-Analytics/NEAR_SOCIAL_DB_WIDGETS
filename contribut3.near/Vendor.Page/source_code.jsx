const ownerId = "contribut3.near";
const accountId = props.accountId ?? context.accountId;

const availableContent = [
  "overview",
  "contracts",
  "history",
];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "overview";
  }

  return content;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1em;
  width: 100%;
`;

const HeaderDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
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
  padding-top: 0.25em;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 20%;
`;

const personPlus = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5.25L14.25 7.5M14.25 7.5L16.5 5.25M14.25 7.5V3M12 15.75V14.85C12 13.5899 12 12.9598 11.7548 12.4785C11.539 12.0552 11.1948 11.711 10.7715 11.4952C10.2902 11.25 9.66012 11.25 8.4 11.25H5.1C3.83988 11.25 3.20982 11.25 2.72852 11.4952C2.30516 11.711 1.96095 12.0552 1.74524 12.4785C1.5 12.9598 1.5 13.5899 1.5 14.85V15.75M9.375 5.625C9.375 7.07475 8.19975 8.25 6.75 8.25C5.30025 8.25 4.125 7.07475 4.125 5.625C4.125 4.17525 5.30025 3 6.75 3C8.19975 3 9.375 4.17525 9.375 5.625Z" stroke="#006ADC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const plus = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 3.75V14.25M3.75 9H14.25"
      stroke="#006ADC"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const CTARow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75em;
`;

const content = {
  overview: <Widget
    src={`${ownerId}/widget/Vendor.About`}
    props={{
      onSave: (s) => {
        console.log(s);
      },
      accountId: props.accountId,
    }}
  />,
  contracts: <Widget src={`${ownerId}/widget/Vendor.Contracts`} props={{ accountId: props.accountId }} />,
  history: <Widget src={`${ownerId}/widget/Vendor.History`} props={{ accountId: props.accountId }} />,
}[getContent(props.content)];

console.log("here")

return (
  <Container>
    <Header>
      <HeaderDetails>
        <Widget
          src={`${ownerId}/widget/Vendor.HeaderDetails`}
          props={{ accountId: props.accountId }}
        />
        <CTARow>
          <Widget
            src={`${ownerId}/widget/Buttons.Grey`}
            props={{
              onClick: () =>
                Near.call(ownerId, "apply_for_program", {
                  account_id: accountId,
                }),
              text: <>{circledPlus}Request contribution</>,
            }}
          />
          <Widget
            src={`${ownerId}/widget/Buttons.Grey`}
            props={{
              onClick: () => {
                console.log("clicked");
              },
              text: <>{plus}Contact</>,
            }}
          />
        </CTARow>
      </HeaderDetails>
    </Header>
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
                id: "contracts",
                text: "Contracts",
              },
              {
                id: "history",
                text: "Work history",
              },
            ],
          }}
        />
        {content}
      </MainContent>
      <Sidebar>
        <Widget
          src={`${ownerId}/widget/Vendor.Sidebar`}
          props={{
            accountId: "contribut3.near",
            onSave: (s) => {
              console.log(s);
            },
          }}
        />
      </Sidebar>
    </ContentContainer>
  </Container>
);
