const accountId = props.accountId ?? context.accountId;

// There is no social graph in DEV - so use the hardcoded list:
//const items = ["bazbar.testnet", "mm-near.testnet", "baduser"];

const following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const items = following
  ? Object.keys(following[accountId].graph.follow || {})
  : null;

/*
const testnetWidgets = {
    itemscroll: "nft12.testnet/widget/ItemScroll",
    profileLine: "bazbar.testnet/widget/ProfileLine",
    allUserChallenges: "bazbar.testnet/widget/all_user_challenges",
};*/

const mainnetWidgets = {
  itemscroll: "mob.near/widget/ItemFeed",
  profileLine: "mob.near/widget/ProfileLine",
  allUserChallenges: "betteryou.neaer/widget/all_user_challenges",
};

const widgets = mainnetWidgets;

const renderItem = (a) => (
  <div key={JSON.stringify(a)} className="mb-2">
    <Widget
      src={widgets["profileLine"]}
      props={{ accountId: a, hideAccountId: true, tooltip: true }}
    />

    <span className="text-muted">challenge:</span>
    <Widget
      src={widgets["allUserChallenges"]}
      props={{ accountId: a, hideLogo: true }}
    />
  </div>
);

return (
  <div>
    <img src="https://user-images.githubusercontent.com/91919554/207791330-aa5bc143-b51d-49b0-a0be-eae26365f1f2.png" />
    <Widget src={widgets["itemscroll"]} props={{ items, renderItem }} />
  </div>
);
