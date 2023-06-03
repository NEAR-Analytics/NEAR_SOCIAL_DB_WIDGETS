const borrowerOperationAddress = "0xD69fC8928D4F3229341cb431263F1EBd87B1ade8";
const troveManagerAddress = "0x0ECDF34731eE8Dd46caa99a1AAE173beD1B32c67";
const lusdTokenAddress = "0x80668Ed2e71290EB7526ABE936327b4f5dB52dA8";

const borrowerOperationAbi = fetch(
  "https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=0xcb306e2509ca52872c2d04160F3c1fa7bc013064"
);

const troveManagerAbi = fetch(
  "https://raw.githubusercontent.com/IDKNWHORU/liquity-sepolia/main/trove-manager-abi.json"
);

const lusdTokenAbi = fetch(
  "https://raw.githubusercontent.com/IDKNWHORU/liquity-sepolia/main/lusd-token-abi.json"
);

const closeTrove = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract.closeTrove().then((transactionHash) => {
    State.update({ loading: true, hash: transactionHash.hash });
  });
};

if (Ethers.provider()) {
  const signer = Ethers.provider().getSigner();
  signer.getAddress().then((address) => {
    State.update({ address });
    if (state.chainId === 11155111) {
      const troveManagerContract = new ethers.Contract(
        troveManagerAddress,
        troveManagerAbi.body,
        Ethers.provider().getSigner()
      );

      const lusdTokenContract = new ethers.Contract(
        lusdTokenAddress,
        lusdTokenAbi.body,
        Ethers.provider().getSigner()
      );

      troveManagerContract.getTroveDebt(address).then((troveDebtRes) => {
        const troveDebt = Number(
          ethers.utils.formatEther(troveDebtRes.toString())
        );
        State.update({
          troveDebt: troveDebt === 0 ? 0 : troveDebt - 200,
        });

        lusdTokenContract.balanceOf(address).then((lusdBalanceRes) => {
          const lusdBalance = Number(
            ethers.utils.formatEther(lusdBalanceRes.toString())
          );
          if (troveDebt - 200 - lusdBalance > 0) {
            State.update({
              isBlock: true,
            });
          }
        });
      });
    }
  });

  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

Ethers.provider() &&
  Ethers.provider()
    .waitForTransaction(state.hash)
    .then((res) => {
      State.update({ troveDebt: undefined, loading: false });
    })
    .catch((err) => {
      State.update({ loading: false });
    });

return (
  <>
    <div>Your Debt</div>
    <div>
      {state.troveDebt ?? 0}
      LUSD
    </div>
    {state.address ? (
      <button disabled={state.isBlock} onClick={closeTrove}>
        Pay off
      </button>
    ) : (
      <Web3Connect connectLabel="Connect Wallet" />
    )}
  </>
);
