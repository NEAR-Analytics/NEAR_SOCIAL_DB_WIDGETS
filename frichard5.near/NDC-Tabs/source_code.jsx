const tabs = props.tabs || [
  {
    value: "tab1",
    label: "data",
    selected: true,
    components: <>data content</>,
  },
  { value: "tab2", label: "time", components: <>time content</> },
];

State.init({
  selectedTab: tabs.find((t) => t.selected).value || tabs[0].value,
});

const tabSelect = (selectedTab) => {
  return () => {
    State.update({ selectedTab });
  };
};
const TabsContainer = styled.div``;
const Tabs = styled.div`
    display:flex;
    justify-content:flex-end;
`;
const Content = styled.div``;
const TabButton = styled.button`
    background: ${(props) => (props.selected ? "#FFD50D" : "blue")}; 
`;

let tabList = [];

tabs.forEach((tab) => {
  tabList.push(
    <TabButton
      onClick={tabSelect(tab.value)}
      selected={tab.value === state.selectedTab}
    >
      {tab.label}
    </TabButton>
  );
});

return (
  <TabsContainer>
    <Tabs>{tabList}</Tabs>
    <Content>
      {tabs.find((t) => t.value === state.selectedTab).components}
    </Content>
  </TabsContainer>
);
