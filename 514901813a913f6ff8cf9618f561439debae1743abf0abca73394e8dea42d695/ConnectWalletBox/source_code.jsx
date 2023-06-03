/**
 * A simple component to notify the user to connect their wallet
 *
 * @remarks
 * Can inherit a theme but will otherwise default
 *
 * props: {
 *  onConnected: () => undefined;
 * }
 */

const sender = Ethers.send("eth_requestAccounts", [])[0];
if (sender) {
  console.log("SETTING CONNECTED");
  State.update({
    connectBox: {
      isConnected: true,
    },
  });
  // new Function(props.onConnected); // :)
  return;
}

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
