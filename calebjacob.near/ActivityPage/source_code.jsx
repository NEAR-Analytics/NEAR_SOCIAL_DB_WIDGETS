State.init({
  selectedTab: "activity",
});

const Main = styled.div`
  display: grid;
  grid-template-columns: 284px minmax(0, 1fr) 284px;
  grid-gap: 16px;

  @media (max-width: 1200px) {
    display: block;
  }
`;

const Section = styled.div`
  padding-top: 24px;
  border-left: ${(p) => (p.primary ? "1px solid #ECEEF0" : "none")};
  border-right: ${(p) => (p.primary ? "1px solid #ECEEF0" : "none")};

  @media (max-width: 1200px) {
    padding-top: 0px;
    border-left: none;
    border-right: none;
    display: ${(p) => (p.active ? "block" : "none")};

    > h2 {
        display: none;
    }
  }
`;

const Tabs = styled.div`
  display: none;
  padding: 0 12px;
  height: 48px;
  border-bottom: 1px solid #ECEEF0;
  margin-bottom: 24px;

  @media (max-width: 1200px) {
    display: flex;
  }
`;

const TabsButton = styled.button`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;

  &:hover {
    color: #11181C;
  }

  &::after {
    content: '';
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 12px;
    right: 12px;
    height: 3px;
    background: #0091FF;
  }
`;

return (
  <>
    <Tabs>
      <TabsButton
        type="button"
        onClick={() => State.update({ selectedTab: "activity" })}
        selected={state.selectedTab === "activity"}
      >
        Activity
      </TabsButton>

      <TabsButton
        type="button"
        onClick={() => State.update({ selectedTab: "apps" })}
        selected={state.selectedTab === "apps"}
      >
        Latest Apps
      </TabsButton>

      <TabsButton
        type="button"
        onClick={() => State.update({ selectedTab: "explore" })}
        selected={state.selectedTab === "explore"}
      >
        Explore
      </TabsButton>
    </Tabs>

    <Main>
      <Section active={state.selectedTab === "apps"}>
        <Widget src="calebjacob.near/widget/LatestApps" />
      </Section>
      <Section primary active={state.selectedTab === "activity"}>
        <Widget src="calebjacob.near/widget/Activity" />
      </Section>
      <Section active={state.selectedTab === "explore"}>
        <Widget src="calebjacob.near/widget/CustomWidgetDisplay" />
      </Section>
    </Main>
  </>
);
