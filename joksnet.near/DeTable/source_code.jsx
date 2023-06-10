const signer = Ethers.send("eth_requestAccounts", [])[0];

if (state.chainId === undefined && ethers !== undefined && signer) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}
if (!state.chainId || !signer) {
  return <p>Please signin</p>;
}
if (state.chainId !== 100) {
  return <p>Switch to Gnosis</p>;
}

return (
  <p>
    Chain: {state.chainId} | Account: {sender}
  </p>
);
