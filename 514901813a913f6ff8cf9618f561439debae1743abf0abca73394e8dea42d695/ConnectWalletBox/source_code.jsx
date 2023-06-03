/**
 * A simple component to notify the user to connect their wallet
 *
 * @remarks
 * Can inherit a theme but will otherwise default
 *
 * props: {
 *  onConnectionChange: (isConnected) => undefined;
 * }
 */

/**
 * Helper function so I can test the component
 */
const callPropFunction = (fn) => {
  if (typeof fn === "string") {
    console.log("Property was string .. Testing???");
    return;
  }
};

const sender = Ethers.send("eth_requestAccounts", [])[0];

if (sender) {
  console.log("SETTING CONNECTED");
  callPropFunction(props.onConnectionChange(true));
  return <></>;
}
callPropFunction(props.onConnectionChange(false));

const fontUrl = `https://ipfs.io/ipfs/bafkreicrs3gh7f77yhpw4xiejx35cd56jcczuhvqbwkn77g2ztkrjejopa`;
const css = {};
if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Pixter;
    background: black;
    color: white;
    padding: 32px;
    .container
    ${css}
`,
  });
}
const Theme = state.theme;

return (
  <Theme>
    <div class="container">
      <h2>Connect Your Wallet</h2>
      <p>You require your wallet to gamble shitcoins</p>
    </div>
  </Theme>
);
