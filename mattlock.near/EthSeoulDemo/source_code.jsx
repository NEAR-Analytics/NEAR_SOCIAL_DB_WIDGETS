const toast = (toast) => {
  State.update({
    toast,
  });
};

if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}
if (state.chainId !== undefined && state.chainId !== 1) {
  return <p>Please switch to Ethereum Mainnet</p>;
}

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    console.log("set sender", accounts[0]);
  }
}

const css = `
    h1 {
        font-size: 2rem;
    }
    button {
        display: block;
        margin: 16px 8px 16px 0;
        border-radius: 0;
    }
`;

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: sans-serif;
    ${css}
`,
  });
}
const Theme = state.theme;

return (
  <Theme>
    <h1>ETH Seoul Demo</h1>
    <p>Sender is {state.sender}</p>

    <Widget
      src={`mattlock.near/widget/EthBalance`}
      props={{
        sender,
        message: `Sender balance is: `,
      }}
    />

    <br />

    <Widget
      src={`mattlock.near/widget/StethBalance`}
      props={{
        sender,
        message: `Sender balance is: `,
      }}
    />
  </Theme>
);
