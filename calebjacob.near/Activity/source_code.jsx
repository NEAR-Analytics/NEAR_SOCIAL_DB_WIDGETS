State.init({
  selectedTab: Storage.privateGet("selectedTab") || "all",
});

console.log(Storage.privateGet("selectedTab") || "all");
console.log("state", state.selectedTab);

let accounts = undefined;

if (state.selectedTab === "following" && context.accountId) {
  const graph = Social.keys(`${context.accountId}/graph/follow/*`, "final");
  if (graph !== null) {
    accounts = Object.keys(graph[context.accountId].graph.follow || {});
    accounts.push(context.accountId);
  } else {
    accounts = [];
  }
} else {
  accounts = undefined;
}

function selectTab(selectedTab) {
  Storage.privateSet("selectedTab", selectedTab);
  State.update({ selectedTab });
}

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181C;
  margin: 0 0 25px;
  padding: 0 24px;
`;

const CreatePostWrapper = styled.div`
  border-top: 1px solid #ECEEF0;
  border-bottom: 1px solid #ECEEF0;
`;

const Tabs = styled.div`
  display: flex;
  padding: 0 12px;
  height: 48px;
  border-bottom: 1px solid #ECEEF0;
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
    <H2>Activity</H2>

    <CreatePostWrapper>
      <Widget src="calebjacob.near/widget/CreatePost" />
    </CreatePostWrapper>

    <Tabs>
      <TabsButton
        type="button"
        onClick={() => selectTab("all")}
        selected={state.selectedTab === "all"}
      >
        All
      </TabsButton>

      <TabsButton
        type="button"
        onClick={() => selectTab("following")}
        selected={state.selectedTab === "following"}
        disabled={!context.accountId}
      >
        Following
      </TabsButton>
    </Tabs>

    <Widget src="calebjacob.near/widget/Feed" props={{ accounts }} />
  </>
);
