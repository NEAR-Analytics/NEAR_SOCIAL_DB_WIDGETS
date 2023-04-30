/** common lib start */
const accountId = props.accountId || context.accountId;
const isSignedIn = !!accountId;

function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}
/** common lib end */
function getConfig() {
  return {
    ownerId: "ref-admin.near",
    contractId: "linear-protocol.near",
    REF_TOKEN_ID: "token.v2.ref-finance.near",
    XREF_TOKEN_ID: "xtoken.ref-finance.near",
    nodeUrl: "https://rpc.mainnet.near.org",
  };
}
const config = getConfig(context.networkId);
const { tabName } = state;
State.init({
  tabName: "stake", // stake | unstake
});

const Main = styled.div`
  width:500px;
  position: relative;
`;

const updateTabName = (tabName) =>
  State.update({
    tabName,
  });

return (
  <Main>
    {state.tabName === "stake" && (
      <Widget
        src={`${config.ownerId}/widget/XREF.Stake`}
        props={{ config, updateTabName }}
      />
    )}
    {state.tabName === "unstake" && (
      <Widget
        src={`${config.ownerId}/widget/XREF.Unstake`}
        props={{ config, updateTabName }}
      />
    )}
  </Main>
);
