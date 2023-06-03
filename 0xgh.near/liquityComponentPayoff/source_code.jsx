const borrowerOperationAddress = "0xD69fC8928D4F3229341cb431263F1EBd87B1ade8";
const troveManagerAddress = "0x0ECDF34731eE8Dd46caa99a1AAE173beD1B32c67";
const lusdTokenAddress = "0x80668Ed2e71290EB7526ABE936327b4f5dB52dA8";

State.init({ mouse: false, loading: false, complete: false });

const borrowerOperationAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_activePoolAddress",
        type: "address",
      },
    ],
    name: "ActivePoolAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_collSurplusPoolAddress",
        type: "address",
      },
    ],
    name: "CollSurplusPoolAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_defaultPoolAddress",
        type: "address",
      },
    ],
    name: "DefaultPoolAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_gasPoolAddress",
        type: "address",
      },
    ],
    name: "GasPoolAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_lqtyStakingAddress",
        type: "address",
      },
    ],
    name: "LQTYStakingAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_LUSDFee",
        type: "uint256",
      },
    ],
    name: "LUSDBorrowingFeePaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_lusdTokenAddress",
        type: "address",
      },
    ],
    name: "LUSDTokenAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newPriceFeedAddress",
        type: "address",
      },
    ],
    name: "PriceFeedAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_sortedTrovesAddress",
        type: "address",
      },
    ],
    name: "SortedTrovesAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_stabilityPoolAddress",
        type: "address",
      },
    ],
    name: "StabilityPoolAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "arrayIndex",
        type: "uint256",
      },
    ],
    name: "TroveCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newTroveManagerAddress",
        type: "address",
      },
    ],
    name: "TroveManagerAddressChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_debt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_coll",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stake",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum BorrowerOperations.BorrowerOperation",
        name: "operation",
        type: "uint8",
      },
    ],
    name: "TroveUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "BORROWING_FEE_FLOOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CCR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DECIMAL_PRECISION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LUSD_GAS_COMPENSATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MCR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_NET_DEBT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NAME",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERCENT_DIVISOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_100pct",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "activePool",
    outputs: [
      { internalType: "contract IActivePool", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_upperHint", type: "address" },
      { internalType: "address", name: "_lowerHint", type: "address" },
    ],
    name: "addColl",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_maxFeePercentage", type: "uint256" },
      { internalType: "uint256", name: "_collWithdrawal", type: "uint256" },
      { internalType: "uint256", name: "_LUSDChange", type: "uint256" },
      { internalType: "bool", name: "_isDebtIncrease", type: "bool" },
      { internalType: "address", name: "_upperHint", type: "address" },
      { internalType: "address", name: "_lowerHint", type: "address" },
    ],
    name: "adjustTrove",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "closeTrove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultPool",
    outputs: [
      { internalType: "contract IDefaultPool", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_debt", type: "uint256" }],
    name: "getCompositeDebt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntireSystemColl",
    outputs: [
      { internalType: "uint256", name: "entireSystemColl", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntireSystemDebt",
    outputs: [
      { internalType: "uint256", name: "entireSystemDebt", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOwner",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lqtyStaking",
    outputs: [
      { internalType: "contract ILQTYStaking", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lqtyStakingAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lusdToken",
    outputs: [
      { internalType: "contract ILUSDToken", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_borrower", type: "address" },
      { internalType: "address", name: "_upperHint", type: "address" },
      { internalType: "address", name: "_lowerHint", type: "address" },
    ],
    name: "moveETHGainToTrove",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_maxFeePercentage", type: "uint256" },
      { internalType: "uint256", name: "_LUSDAmount", type: "uint256" },
      { internalType: "address", name: "_upperHint", type: "address" },
      { internalType: "address", name: "_lowerHint", type: "address" },
    ],
    name: "openTrove",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceFeed",
    outputs: [
      { internalType: "contract IPriceFeed", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_LUSDAmount", type: "uint256" },
      { internalType: "address", name: "_upperHint", type: "address" },
      { internalType: "address", name: "_lowerHint", type: "address" },
    ],
    name: "repayLUSD",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_troveManagerAddress",
        type: "address",
      },
      { internalType: "address", name: "_activePoolAddress", type: "address" },
      { internalType: "address", name: "_defaultPoolAddress", type: "address" },
      {
        internalType: "address",
        name: "_stabilityPoolAddress",
        type: "address",
      },
      { internalType: "address", name: "_gasPoolAddress", type: "address" },
      {
        internalType: "address",
        name: "_collSurplusPoolAddress",
        type: "address",
      },
      { internalType: "address", name: "_priceFeedAddress", type: "address" },
      {
        internalType: "address",
        name: "_sortedTrovesAddress",
        type: "address",
      },
      { internalType: "address", name: "_lusdTokenAddress", type: "address" },
      { internalType: "address", name: "_lqtyStakingAddress", type: "address" },
    ],
    name: "setAddresses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sortedTroves",
    outputs: [
      { internalType: "contract ISortedTroves", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "troveManager",
    outputs: [
      { internalType: "contract ITroveManager", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_collWithdrawal", type: "uint256" },
      { internalType: "address", name: "_upperHint", type: "address" },
      { internalType: "address", name: "_lowerHint", type: "address" },
    ],
    name: "withdrawColl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_maxFeePercentage", type: "uint256" },
      { internalType: "uint256", name: "_LUSDAmount", type: "uint256" },
      { internalType: "address", name: "_upperHint", type: "address" },
      { internalType: "address", name: "_lowerHint", type: "address" },
    ],
    name: "withdrawLUSD",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const troveManagerAbi = fetch(
  "https://raw.githubusercontent.com/IDKNWHORU/liquity-sepolia/main/trove-manager-abi.json"
);

const lusdTokenAbi = fetch(
  "https://raw.githubusercontent.com/IDKNWHORU/liquity-sepolia/main/lusd-token-abi.json"
);

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

const infoHandler = () => {
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
};

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
          className={`debt-value ${state.isBlock ? "disabled" : "active"} ${
            state.loading ? "loading" : ""
          } ${state.complete ? "complete" : ""}`}
          // disabled={state.isBlock}
          onClick={closeTrove}
        >
          {state.loading
            ? "Loading..."
            : state.complete
            ? "Done ✅"
            : state.mouse
            ? state.isBlock
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
