const ownerId = "nearhorizon.near";
// const accountId = props.accountId ?? context.accountId;
const accountId = "nearefi.near";
State.init({
  isAdmin: false,
  isAdminIsFetched: false,
  project: null,
  projectIsFetched: false,
});

if (!state.isAdminIsFetched) {
  if (!context.accountId) {
    State.update({ isAdmin: false, isAdminIsFetched: true });
  } else {
    Near.asyncView(
      ownerId,
      "check_is_project_admin",
      { project_id: accountId, account_id: context.accountId },
      "final",
      false
    ).then((isAdmin) => State.update({ isAdmin, isAdminIsFetched: true }));
  }
}

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: accountId },
    "final",
    false
  ).then((project) => State.update({ project, projectIsFetched: true }));
}

if (!state.projectIsFetched || !state.isAdminIsFetched) {
  return <>Loading...</>;
}

const availableContent = [
  "overview",
  "requests",
  "people",
  "history",
  "documents",
];

const getContent = (content) => {
  if (!content || !availableContent.includes(content)) {
    return "requests";
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
  width: 80%;
`;

const HeaderProgress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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

const circledPlus = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1624_38049)">
      <path
        d="M9 6V12M6 9H12M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
        stroke="currentColor"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1624_38049">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
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
  margin-top: 1em;
`;

const content = {
  requests: (
    <Widget
      src={`${ownerId}/widget/Project.Requests`}
      props={{ accountId: accountId }}
    />
  ),
}[getContent(props.content)];

const GreyButton = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.75em 1em;
  gap: 0.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  color: #006adc;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  white-space: nowrap;
`;

return (
  <Container>
    <Header>
      <HeaderDetails>
        <Widget
          src={`${ownerId}/widget/Project.HeaderDetails`}
          props={{ accountId, isAdmin: state.isAdmin }}
        />
        <CTARow>
          {state.isAdmin ? (
            <>
              {state.project.application === "NotSubmitted" ||
              (typeof state.project.application === "object" &&
                "Rejected" in state.project.application) ? (
                <Widget
                  src={`${ownerId}/widget/Buttons.Green`}
                  props={{
                    onClick: () =>
                      Near.call(ownerId, "apply_for_program", {
                        account_id: accountId,
                      }),
                    text: <>{circledPlus}Apply for credits</>,
                  }}
                />
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </CTARow>
      </HeaderDetails>
    </Header>
    <ContentContainer>
      <MainContent>{content}</MainContent>
    </ContentContainer>
  </Container>
);
