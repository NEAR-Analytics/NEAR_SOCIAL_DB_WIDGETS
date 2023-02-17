State.init({
  selectedTab: props.tab || "activity",
});

if (props.tab && props.tab !== state.selectedTab) {
  State.update({
    selectedTab: props.tab,
  });
}

const Wrapper = styled.div`
  margin-top: calc(var(--body-top-padding) * -1);
  padding-bottom: 48px;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr) 300px;
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
    margin: ${(p) => (p.negativeMargin ? "0 -12px" : "0")};
  }
`;

const Tabs = styled.div`
  display: none;
  height: 48px;
  background: #F8F9FA;
  border-top: 1px solid #ECEEF0;
  border-bottom: 1px solid #ECEEF0;
  margin-bottom: ${(p) => (p.noMargin ? "0" : p.halfMargin ? "24px" : "24px")};
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 1200px) {
    display: flex;
    margin-left: -12px;
    margin-right: -12px;

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
  font-size: 12px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    color: #11181C;
  }

  &::after {
    content: '';
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #0091FF;
  }
`;

return (
  <Wrapper negativeMargin={state.selectedTab === "activity"}>
    <Tabs
      halfMargin={state.selectedTab === "apps"}
      noMargin={state.selectedTab === "activity"}
    >
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
        Apps
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
        <Widget src="calebjacob.near/widget/ExploreWidgets" />
      </Section>
    </Main>
  </Wrapper>
);
