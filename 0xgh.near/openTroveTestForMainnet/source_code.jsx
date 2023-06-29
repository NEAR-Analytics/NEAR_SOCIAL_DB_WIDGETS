State.init({
  displayColl: "",
  displayBorrow: "",
  coll: 0,
  borrow: 0,
  borrowingFee: 0,
  totalcoll: 0,
  collateralRatio: 0,
  liquidationReserve: 0,
  complete: false,
  loading: false,
  msg: "",
  borrowRate: 0,
  address: undefined,
  chainId: undefined,
  balance: undefined,
  price: 0,
  isOpenTrove: undefined,
  isRecoveryMode: undefined,
  isBlocked: true,
  isGasAllocated: false,
  isBorrowingRate: false,
});

const setcoll = (depositChangeEvent) => {
  const value = depositChangeEvent.target.value.replace(/[^.0-9]/g, "");
  const coll = Number(value);
  const { totalcoll } = state;
  const collateralRatio = ((coll * state.price) / Number(totalcoll)) * 100;

  State.update({
    displayColl: value,
    coll,
    collateralRatio,
  });

  validateTrove();
};

const setBorrow = (borrowChangeEvent) => {
  const { coll, liquidationReserve, borrowRate, isRecoveryMode } = state;
  const value = borrowChangeEvent.target.value.replace(/[^.0-9]/g, "");
  const borrow = Number(value);
  const borrowingFee =
    isRecoveryMode === true ? 0 : (borrow * borrowRate) / 100;
  const totalcoll =
    borrow + Number(borrowingFee.toFixed(2)) + liquidationReserve;
  const collateralRatio = ((coll * state.price) / Number(totalcoll)) * 100;

  State.update({
    displayBorrow: value,
    borrow,
    borrowingFee,
    totalcoll,
    collateralRatio,
  });
  validateTrove();
};

const validateTrove = () => {
  const { coll, borrow, totalcoll, balance, isRecoveryMode } = state;

  if (borrow < 1800) {
    State.update({
      msg: "Borrow must be at least 1800 LUSD",
      isBlocked: true,
    });
    return;
  }

  const collateralRatio = ((coll * state.price) / Number(totalcoll)) * 100;

  if (isRecoveryMode === true) {
    if (collateralRatio < 150) {
      State.update({
        msg: "Collateral ratio must be at least 150%",
        isBlocked: true,
      });
      return;
    }
  } else {
    if (collateralRatio < 110) {
      State.update({
        msg: "Collateral ratio must be at least 110%",
        isBlocked: true,
      });
      return;
    }
  }

  if (coll > Number(balance)) {
    State.update({
      msg: `The amount you're trying to deposit exceeds your balance by ${coll} ETH`,
      isBlocked: true,
    });
    return;
  }

  State.update({ msg: "", isBlocked: false });
};

const borrowerOperationAddress = "0x24179CD81c9e782A4096035f7eC97fB8B783e007";
const borrowerOperationABI = [
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
];

const troveManagerAddress = "0xA39739EF8b0231DbFA0DcdA07d7e29faAbCf4bb2";

const troveManagerABI = [
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "getTroveStatus",
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
  {
    inputs: [],
    name: "LUSD_GAS_COMPENSATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_LUSDDebt", type: "uint256" }],
    name: "getBorrowingFeeWithDecay",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBorrowingRateWithDecay",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_price", type: "uint256" }],
    name: "checkRecoveryMode",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];

const priceFeedAddress = "0x4c517D4e2C851CA76d7eC94B805269Df0f2201De";
const priceFeedABI = [
  {
    inputs: [],
    name: "lastGoodPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const sortedtrovesAddress = "0x8FdD3fbFEb32b28fb73555518f8b361bCeA741A6";
const sortedtrovesABI = [
  {
    inputs: [],
    name: "getSize",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_NICR", type: "uint256" },
      { internalType: "address", name: "_prevId", type: "address" },
      { internalType: "address", name: "_nextId", type: "address" },
    ],
    name: "findInsertPosition",
    outputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const hintHelpersAddress = "0xE84251b93D9524E0d2e621Ba7dc7cb3579F997C0";
const hintHelpersABI = [
  {
    inputs: [
      { internalType: "uint256", name: "_CR", type: "uint256" },
      { internalType: "uint256", name: "_numTrials", type: "uint256" },
      { internalType: "uint256", name: "_inputRandomSeed", type: "uint256" },
    ],
    name: "getApproxHint",
    outputs: [
      { internalType: "address", name: "hintAddress", type: "address" },
      { internalType: "uint256", name: "diff", type: "uint256" },
      { internalType: "uint256", name: "latestRandomSeed", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const openTrove = async () => {
  if (state.complete) {
    State.update({ complete: false, hash: null });
  }

  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationABI,
    Ethers.provider().getSigner()
  );

  const sortedTroveContract = new ethers.Contract(
    sortedtrovesAddress,
    sortedtrovesABI,
    Ethers.provider().getSigner()
  );

  const hintHelpersContract = new ethers.Contract(
    hintHelpersAddress,
    hintHelpersABI,
    Ethers.provider().getSigner()
  );

  const LUSDAmount = ethers.BigNumber.from(
    ethers.utils.parseEther(state.borrow.toString())
  );

  const expectedDebt = ethers.BigNumber.from(
    ethers.utils.parseEther(state.totalcoll.toString())
  );

  const _1e20 = ethers.BigNumber.from(ethers.utils.parseEther("100"));

  const ETHColl = ethers.BigNumber.from(
    ethers.utils.parseEther(state.coll.toString())
  );

  const NICR = ETHColl.mul(_1e20).div(expectedDebt);

  sortedTroveContract.getSize().then((numTroves) => {
    const _numTrials = numTroves.mul(ethers.BigNumber.from("15"));

    hintHelpersContract
      .getApproxHint(NICR, _numTrials, 42)
      .then((approxHintRes) => {
        const approxHint = approxHintRes[0];

        sortedTroveContract
          .findInsertPosition(NICR, approxHint, approxHint)
          .then((hintRes) => {
            const upperHint = hintRes[0];
            const lowerHint = hintRes[1];

            borrowerOperationContract
              .openTrove(
                ethers.BigNumber.from(ethers.utils.parseEther("0.005")),
                LUSDAmount,
                upperHint,
                lowerHint,
                {
                  value: ETHColl,
                }
              )
              .then((transactionHash) => {
                State.update({
                  loading: true,
                  hash: transactionHash.hash,
                  borrow: 0,
                  displayBorrow: "",
                  coll: 0,
                  displayColl: "",
                  borrowingFee: 0,
                  totalcoll: state.liquidationReserve,
                  collateralRatio: 0,
                  liquidationReserve: state.liquidationReserve,
                });
              });
          });
      });
  });
};

if (Ethers.provider()) {
  const signer = Ethers.provider().getSigner();
  signer.getAddress().then((address) => {
    State.update({ address });
    if (state.chainId === 1) {
      const troveManagerContract = new ethers.Contract(
        troveManagerAddress,
        troveManagerABI,
        Ethers.provider().getSigner()
      );

      if (state.balance === undefined) {
        Ethers.provider()
          .getBalance(address)
          .then((balance) => {
            State.update({
              balance: Big(balance).div(Big(10).pow(18)).toFixed(2),
            });
          });
      }

      if (state.isOpenTrove === undefined) {
        troveManagerContract.getTroveStatus(address).then((res) => {
          const isOpenTrove = ethers.utils.formatEther(res).includes("1");
          State.update({ isOpenTrove });
        });
      }

      if (state.isGasAllocated === false) {
        troveManagerContract
          .LUSD_GAS_COMPENSATION()
          .then((liquidationReserveRes) => {
            const liquidationReserve = Number(
              ethers.utils.formatEther(liquidationReserveRes)
            );

            State.update({
              isGasAllocated: true,
              totalcoll: liquidationReserve,
              liquidationReserve: liquidationReserve,
            });
          });
      }

      if (state.isBorrowingRate === false) {
        troveManagerContract
          .getBorrowingRateWithDecay()
          .then((borrowingRateRes) => {
            State.update({
              isBorrowingRate: true,
              borrowRate:
                Number(
                  ethers.utils.formatEther(borrowingRateRes).substring(0, 6)
                ) * 100,
            });
          });
      }
    }
  });

  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });

  if (state.price === 0) {
    const priceFeedContract = new ethers.Contract(
      priceFeedAddress,
      priceFeedABI,
      Ethers.provider().getSigner()
    );

    const troveManagerContract = new ethers.Contract(
      troveManagerAddress,
      troveManagerABI,
      Ethers.provider().getSigner()
    );

    priceFeedContract.lastGoodPrice().then((priceRes) => {
      const price = Number(ethers.utils.formatEther(priceRes));

      State.update({ price });
      troveManagerContract.getTCR(priceRes).then((tcrRes) => {
        const tcr = Number(ethers.utils.formatEther(tcrRes)) * 100;

        State.update({ tcr });
      });

      troveManagerContract
        .checkRecoveryMode(ethers.BigNumber.from(priceRes))
        .then((isRecoveryMode) => {
          State.update({ isRecoveryMode: isRecoveryMode });
        });
    });
  }
}

const complete = () => {
  State.update({ complete: true });
};

Ethers.provider() &&
  Ethers.provider()
    .waitForTransaction(state.hash)
    .then((res) => {
      State.update({
        loading: false,
      });
      complete();
    })
    .catch((err) => {
      State.update({ loading: false });
    });

const BorrowWrapper = styled.div`
  width: 100%;
  .input-section{
    width: 100%;
    color: #8e9aaf;
    &.deposit{
        margin-bottom: 1rem;
    }
  }
  .input-label{
    color: black;
    margin-bottom: 0.5rem;
  }
  .input-wrapper{
    display: flex;
    width: 100%;
    border: rgb(220, 220, 220) 1px solid;
    border-radius: 10px;
    overflow: hidden;
  }
  .info-wrapper{
    display: flex;
    flex-direction: column;
    margin: 0 0 2rem 0;
    div {
      height: 1.75rem;
      display: flex;
      align-items: center;
    }
  }
  .detail-info-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #8e9aaf;
  }
    .error-message{
        height: 2rem;
        width: 100%;
        color: #3a0ca3;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .info-unit{
        margin-left: 0.5rem;
    }

    .confirm-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .confirm {
    border: none;
    border-radius: 1000px;
    width: 75%;
    height: 2rem;
    transition: 0.5s all;
    
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    &.ok {
      background-color: #3a0ca3;
      color: white;
      font-size: 1.1rem;
    }
    &.not-ok {
      background-color: #8e9aaf;
      color: white;
      font-size: 0.9rem;
    }
  }

  input {
    border: none;
    background-color: transparent;
  }
  input:focus {
    outline: none;
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

return (
  <BorrowWrapper>
    <div className="input-section deposit">
      <div className="input-label">Deposit (ETH)</div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="0.0000 ETH"
          disabled={!state.address || state.isOpenTrove || state.chainId !== 1}
          onChange={setcoll}
          value={state.displayColl}
        ></input>
      </div>
    </div>
    <div className="input-section">
      <div className="input-label">Borrow (LUSD)</div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="0.0000 LUSD"
          disabled={!state.address || state.isOpenTrove || state.chainId !== 1}
          onChange={setBorrow}
          value={state.displayBorrow}
        />
      </div>
    </div>
    <div className="error-message">{state.msg}</div>
    <div className="info-wrapper">
      <div className="detail-info-wrapper">
        <div className="detail-info-label">Liquidation Reserve</div>
        <div className="detail-info-value">
          <span className="">{state.liquidationReserve}</span>
          <span className="info-unit">LUSD</span>
        </div>
      </div>
      <div className="detail-info-wrapper">
        <div className="detail-info-label">Borrowing Fee</div>
        <div className="detail-info-value">
          <span className="">{state.borrowingFee.toFixed(2)}</span>{" "}
          <span className="info-unit">
            LUSD (
            {state.isRecoveryMode === true ? 0 : state.borrowRate.toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="detail-info-wrapper">
        <div className="detail-info-label">Recieve</div>
        <div className="detail-info-value">
          <span className="">{state.borrow.toFixed(2)}</span>
          <span className="info-unit">LUSD</span>
        </div>
      </div>

      <div className="detail-info-wrapper">
        <div className="detail-info-label">Total debt</div>
        <div className="detail-info-value">
          <span className="">{state.totalcoll.toFixed(2)}</span>
          <span className="info-unit">LUSD</span>
        </div>
      </div>
      <div className="detail-info-wrapper">
        <div className="detail-info-label">Collateral ratio</div>
        <div className="detail-info-value">
          <span>{state.collateralRatio.toFixed(1)}</span>
          <span className="info-unit">%</span>
        </div>
      </div>
    </div>
    <div className="confirm-wrapper">
      {state.address ? (
        <button
          className={`confirm ${state.isBlocked ? "not-ok" : "ok"}`}
          disabled={state.isBlocked}
          onClick={openTrove}
        >
          {Ethers.provider() && state.chainId !== 1
            ? "Change network to Ethereum"
            : state.isOpenTrove === true
            ? "You already have active Trove"
            : state.loading
            ? "Loading..."
            : state.complete
            ? "Done ✅"
            : state.coll === 0 || state.borrow === 0
            ? "Enter input value"
            : state.isBlocked
            ? "Check stats"
            : "Open Trove"}
        </button>
      ) : (
        <Web3Connect className="connect-wallet" />
      )}
    </div>
  </BorrowWrapper>
);
