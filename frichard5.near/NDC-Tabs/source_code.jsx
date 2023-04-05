const tabs = props.tabs || [
  { value: "tab1", label: "data" },
  { value: "tab2", label: "time" },
];
const tabSelect =
  props.tabSelect || ((tab) => console.log(`selected tab: ${tab}`));

const tabSelectCb = (tabValue) => {
  return () => tabSelect(tabValue);
};

const Tabs = styled.div`
    display:flex;
`;
const TabButton = styled.button`
    background: ${(props) => props.theme.main};
`;

let tabList = [];

tabs.forEach((tab) => {
  tabList.push(
    <TabButton onClick={tabSelectCb(tab.value)}>{tab.label}</TabButton>
  );
});

return <Tabs>{tabList}</Tabs>;
