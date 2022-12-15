const { tab1, tab2, tab3 } = props;

const TabNavigationContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;

`;

const TabList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Tab = styled.li`
  font-weight: 600;
  text-decoration: none;
  color: ${(props) => (props.active ? "#007bff" : "#6c757d")};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &:hover {
    color: ${(props) => (props.active ? "#0069d9" : "#5a6268")};
  }
`;

State.init({
  activeTab: "Tab 1",
});
const setActiveTab = (tab_name) => {
  State.update({ activeTab: tab_name });
};
const peopleYouMayKnow = () => {
  return (
    <>
      <p>
        Based on your current connections, you might also want to follow the
        following accounts.
      </p>
    </>
  );
};
const notFound = () => {
  return (
    <>
      <p>no tab found here</p>
    </>
  );
};
const TabNavigation = () => {
  return (
    <TabNavigationContainer>
      <TabList>
        <Tab
          active={state.activeTab === "Tab 1"}
          onClick={() => setActiveTab("Tab 1")}
        >
          Tab 1
        </Tab>
        <Tab
          active={state.activeTab === "Tab 2"}
          onClick={() => setActiveTab("Tab 2")}
        >
          Tab 2
        </Tab>
        <Tab
          active={state.activeTab === "Tab 3"}
          onClick={() => setActiveTab("Tab 3")}
        >
          Tab 3
        </Tab>
      </TabList>
    </TabNavigationContainer>
  );
};

return (
  <>
    {state.activeTab === "Tab 1" && !tab1 && notFound()}

    {state.activeTab === "Tab 1" && tab1 && peopleYouMayKnow()}
    {state.activeTab === "Tab 2" && tab2 && tab2()}
    {state.activeTab === "Tab 3" && tab3 && tab3()}
    <TabNavigationContainer>
      <TabList>
        <Tab
          active={state.activeTab === "Tab 1"}
          onClick={() => setActiveTab("Tab 1")}
        >
          <i class="bi bi-search fs-4"></i>
        </Tab>
        <Tab
          active={state.activeTab === "Tab 2"}
          onClick={() => setActiveTab("Tab 2")}
        >
          <i class="bi bi-people fs-4"></i>
        </Tab>
        <Tab
          active={state.activeTab === "Tab 3"}
          onClick={() => setActiveTab("Tab 3")}
        >
          <i class="bi bi-controller fs-4"></i>
        </Tab>
      </TabList>
    </TabNavigationContainer>
  </>
);
