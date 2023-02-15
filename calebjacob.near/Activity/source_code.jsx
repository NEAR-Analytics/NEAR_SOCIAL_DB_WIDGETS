State.init({
  selectedTab: Storage.privateGet("selectedTab") || "all",
});

const previousSelectedTab = Storage.privateGet("selectedTab");

if (previousSelectedTab && previousSelectedTab !== state.selectedTab) {
  State.update({
    selectedTab: previousSelectedTab,
  });
}

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
  margin: 0 0 24px;
  padding: 0 24px;
`;

const CreatePostWrapper = styled.div`
  border-top: 1px solid #ECEEF0;
  border-bottom: 1px solid #ECEEF0;

  @media (max-width: 1200px) {
    border-top: none;
  }
`;

const PillSelect = styled.div`
  display: flex;
  padding: 0 24px;
  height: 48px;
  border-bottom: 1px solid #ECEEF0;
  align-items: center;
  justify-content: center;

  @media (max-width: 1200px) {
    padding: 0 12px;
  }
`;

const PillSelectButton = styled.button`
  display: block;
  border: 1px solid #E6E8EB;
  border-right: none;
  padding: 3px 8px;
  border-radius: 0;
  font-size: 12px;
  line-height: 18px;
  color: ${(p) => (p.selected ? "#fff" : "#687076")};
  background: ${(p) => (p.selected ? "#006ADC !important" : "#FBFCFD")};
  font-weight: 600;
  transition: all 200ms;

  &:hover,
  &:focus {
    background: #ECEDEE;
    text-decoration: none;
  }

  &:first-child {
    border-radius: 6px 0 0 6px;
  }
  &:last-child {
    border-radius: 0 6px 6px 0;
    border: 1px solid #E6E8EB;
  }
`;

return (
  <>
    <H2>Activity</H2>

    <CreatePostWrapper>
      <Widget src="calebjacob.near/widget/CreatePost" />
    </CreatePostWrapper>

    <PillSelect>
      <PillSelectButton
        type="button"
        onClick={() => selectTab("all")}
        selected={state.selectedTab === "all"}
      >
        All
      </PillSelectButton>

      <PillSelectButton
        type="button"
        onClick={() => selectTab("following")}
        selected={state.selectedTab === "following"}
        disabled={!context.accountId}
      >
        Following
      </PillSelectButton>
    </PillSelect>

    <Widget src="calebjacob.near/widget/Feed" props={{ accounts }} />
  </>
);
