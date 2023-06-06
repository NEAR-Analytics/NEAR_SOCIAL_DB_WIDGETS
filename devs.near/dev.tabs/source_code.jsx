State.init({
  selectedTab: props.tab || "leaderboard",
});

const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";

if (props.tab && props.tab !== state.selectedTab) {
  State.update({
    selectedTab: props.tab,
  });
}

const Wrapper = styled.div`
  padding-bottom: 48px;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: ${(p) => p.size || "25px"};
  line-height: 1.2em;
  color: #11181c;
  margin: ${(p) => (p.margin ? "0 0 24px" : "0")};
  overflow-wrap: anywhere;
`;

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #eceef0;
  margin-bottom: 72px;
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 1200px) {
    background: #f8f9fa;
    border-top: 1px solid #eceef0;
    margin: 0 -12px 48px;

    > * {
      flex: 1;
    }
  }
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 23px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    color: #11181c;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #59e692;
  }
`;

return (
  <Wrapper>
    <Tabs>
      <TabsButton
        href={`${accountUrl}&tab=leaderboard`}
        selected={state.selectedTab === "leaderboard"}
      >
        Leaderboard
      </TabsButton>

      <TabsButton
        href={`${accountUrl}&tab=questions`}
        selected={state.selectedTab === "questions"}
      >
        Questions
      </TabsButton>

      <TabsButton
        href={`${accountUrl}&tab=groups`}
        selected={state.selectedTab === "groups"}
      >
        Groups
      </TabsButton>

      <TabsButton
        href={`${accountUrl}&tab=projects`}
        selected={state.selectedTab === "projects"}
      >
        Projects
      </TabsButton>

      <TabsButton
        href={`${accountUrl}&tab=rewards`}
        selected={state.selectedTab === "rewards"}
      >
        Rewards
      </TabsButton>
    </Tabs>

    {state.selectedTab === "leaderboard" && (
      <>
        <Widget src="devs.near/widget/dev.Rank" />
      </>
    )}

    {state.selectedTab === "discussion" && (
      <Widget src={feed ?? "academy.near/widget/edu"} props={{ daoId }} />
    )}

    {state.selectedTab === "members" && (
      <Widget src="hack.near/widget/DAO.Groups" props={{ daoId }} />
    )}

    {state.selectedTab === "projects" && (
      <Widget src="every.near/widget/browser?path=every.near/thing/test" />
    )}

    {state.selectedTab === "rewards" && (
      <Widget src="devs.near/widget/dev.tasks" props={{ daoId }} />
    )}
  </Wrapper>
);
