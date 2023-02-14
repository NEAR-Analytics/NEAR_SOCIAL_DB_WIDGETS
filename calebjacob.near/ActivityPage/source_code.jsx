State.init({
  selectedTab: "activity",
});

const Wrapper = styled.div``;

const Main = styled.div`
  display: grid;
  grid-template-columns: 284px minmax(0, 1fr) 284px;
  grid-gap: 16px;
  padding-bottom: 24px;

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
    margin: ${(p) => (p.negativeMargin ? "0 -12px" : "0")};

    > h2 {
        display: none;
    }
  }
`;

const Tabs = styled.div`
  display: none;
  padding: 0 6px;
  height: 48px;
  background: #F8F9FA;
  border-bottom: ${(p) => (p.noMargin ? "none" : "1px solid #ECEEF0")};
  margin-bottom: ${(p) => (p.noMargin ? "0" : "24px")};

  @media (max-width: 1200px) {
    display: flex;
    margin-left: -12px;
    margin-right; -12px;
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
  <Wrapper negativeMargin={state.selectedTab === "activity"}>
    <Tabs noMargin={state.selectedTab === "activity"}>
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
      <Section negativeMargin primary active={state.selectedTab === "activity"}>
        <Widget src="calebjacob.near/widget/Activity" />
      </Section>
      <Section active={state.selectedTab === "explore"}>
        <Widget src="calebjacob.near/widget/CustomWidgetDisplay" />
      </Section>
    </Main>
  </Wrapper>
);
