const borrowerOperationAddress = "0x24179CD81c9e782A4096035f7eC97fB8B783e007";
const troveManagerAddress = "0xA39739EF8b0231DbFA0DcdA07d7e29faAbCf4bb2";
const lusdTokenAddress = "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0";
const priceFeedAddress = "0x4c517D4e2C851CA76d7eC94B805269Df0f2201De";

State.init({ mouse: false, loading: false, complete: false });

/**
 * @description
 * 4 out of all contracts are being used for close trove.
 * Only the used functions are defined in the abi objects.
 * The contract address is registered on the Ethereum mainnet.
 *
 * Contract list.
 *   1. borrowerOperation
 *   2. troveManager
 *   3. lusdToken
 *   4. priceFeed
 */
const borrowerOperationAbi = [
  {
    inputs: [],
    name: "closeTrove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const troveManagerAbi = [
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "getTroveDebt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_price", type: "uint256" }],
    name: "getTCR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
const lusdTokenAbi = [
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
const priceFeedAbi = [
  {
    inputs: [],
    name: "lastGoodPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

/**
 * @description
 * Call transaction "BorrowerOperations.closeTrove" user click button.
 */
const closeTrove = () => {
  if (state.complete) {
    State.update({ complete: false, hash: null });
    return;
  }
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract.closeTrove().then((transactionHash) => {
    State.update({ loading: true, hash: transactionHash.hash });
  });
};

/**
 * @description
 * get trove information
 *   1. ethereum price
 *   2. user trove debt
 *   3. user lusd balance
 */
const infoHandler = () => {
  const signer = Ethers.provider().getSigner();
  signer.getAddress().then((address) => {
    State.update({ address });
    if (state.chainId === 1) {
      const troveManagerContract = new ethers.Contract(
        troveManagerAddress,
        troveManagerAbi,
        Ethers.provider().getSigner()
      );

      const lusdTokenContract = new ethers.Contract(
        lusdTokenAddress,
        lusdTokenAbi,
        Ethers.provider().getSigner()
      );
      const priceFeedContract = new ethers.Contract(
        priceFeedAddress,
        priceFeedAbi,
        Ethers.provider().getSigner()
      );

      priceFeedContract.lastGoodPrice().then((res) => {
        troveManagerContract.getTCR(res.toString()).then((tcr) => {
          State.update({ tcr: Number(tcr.div("10000000000000000")) });
        });
      });

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
};

/**
 * @description
 * This code block initializes sceanario
 * The checklist assumes you have already connected your wallet.
 */
if (Ethers.provider()) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });

  infoHandler();
}

/**
 * @description
 * Present the current status of the UI where the transaction is in progress.
 */
Ethers.provider() &&
  Ethers.provider()
    .waitForTransaction(state.hash)
    .then((res) => {
      State.update({ loading: false, complete: true });
      infoHandler();
    })
    .catch((err) => {
      State.update({ loading: false });
    });

/**
 * @description
 * This UI style uses the the "Styled Component" library.
 * Update this code block to change the style.
 */
const PayoffWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .debt-label{
    width: 100%;
    font-size: 1.3rem;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .debt-value{
    transition: 0.3s all;
    margin: 1rem 0 1rem 0;
    min-width: 190px;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border: #3a0ca3 1.5px solid ;
    border-radius: 10px;
    font-weight: 600;
    background-color: white;
   
    &.disabled{
      &:hover{
      background-color: #8e9aaf;
      color: white;
      border-color: #8e9aaf;
    }
    }
    &.active{
    &:hover{
      background-color: #3a0ca3;
      color: white;
    }
    }
     &.loading{
      background-color: transparent !important;
      cursor: default;
      &:hover{
      background-color: transparent !important;
      color: black !important;
      border-color: #3a0ca3 !important;
    }
    }
    &.complete{
      background-color: #3a0ca3 !important;
      color: white;
      &:hover{
      background-color: #3a0ca3 !important;
      color: white !important;
      border-color: #3a0ca3 !important;
    }
  }
  .confirm-wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

  }
`;

/**
 * @description
 * This code block is HTML tags for building the UI structure.
 * The UI is activated when the conditions below are satisfied.
 * 1. Connect your wallet.
 * 2. Network is Ethereum mainnet.
 * 3. There should be active trove.
 * 4. User have sufficient balance of lusd.
 */
return (
  <PayoffWrapper>
    <div className="debt-label">You pay for debt</div>

    <div className="confirm-wrapper">
      {state.address ? (
        <button
          onMouseEnter={() => {
            State.update({ mouse: true });
          }}
          onMouseLeave={() => {
            State.update({ mouse: false });
          }}
          className={`debt-value ${
            state.isBlock || state.tcr < 150 ? "disabled" : "active"
          } ${state.loading ? "loading" : ""} ${
            state.complete ? "complete" : ""
          }`}
          // disabled={state.isBlock}
          onClick={closeTrove}
        >
          {state.loading
            ? "Loading..."
            : state.complete
            ? "Done ✅"
            : state.mouse
            ? state.tcr < 150
              ? "In recovery mode, not possible"
              : state.isBlock
              ? "Not enough LUSD 🥲"
              : state.troveDebt === 0
              ? "No debt"
              : "Pay off all debt 🔥"
            : `${state.troveDebt ?? 0}
          LUSD`}
        </button>
      ) : (
        <Web3Connect connectLabel="Connect Wallet" />
      )}
    </div>
  </PayoffWrapper>
);
