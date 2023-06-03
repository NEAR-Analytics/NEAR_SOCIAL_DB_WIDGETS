const setcoll = (depositChangeEvent) => {
  const coll = Number(depositChangeEvent.target.value);
  const { totalcoll } = state;
  const collateralRatio = ((coll * state.price) / Number(totalcoll)) * 100;

  State.update({ coll, collateralRatio });

  validateTrove();
};

const setBorrow = (borrowChangeEvent) => {
  const { coll, liquidationReserve } = state;
  const borrow = Number(borrowChangeEvent.target.value);
  const borrowingFee = (borrow * 0.5) / 100;
  const totalcoll =
    borrow + Number(borrowingFee.toFixed(2)) + liquidationReserve;
  const collateralRatio = ((coll * state.price) / Number(totalcoll)) * 100;

  State.update({ borrow, borrowingFee, totalcoll, collateralRatio });
  validateTrove();
};

const validateTrove = () => {
  const { coll, borrow, totalcoll, balance } = state;

  if (borrow < 1800) {
    State.update({
      msg: "Borrow must be at least 1800 LUSD.",
      isBlocked: true,
    });
    return;
  }

  const collateralRatio = ((coll * state.price) / Number(totalcoll)) * 100;
  if (collateralRatio < 110) {
    State.update({
      msg: "Collateral ratio must be at least 110%.",
      isBlocked: true,
    });
    return;
  }

  if (coll > Number(balance)) {
    State.update({
      msg: `The amount you're trying to deposit exceeds your balance by ${coll} ETH.`,
      isBlocked: true,
    });
    return;
  }

  State.update({ msg: "", isBlocked: false });
};

const borrowerOperationAddress = "0xD69fC8928D4F3229341cb431263F1EBd87B1ade8";

const troveManagerAddress = "0x0ECDF34731eE8Dd46caa99a1AAE173beD1B32c67";

const borrowerOperationAbi = fetch(
  "https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=0xcb306e2509ca52872c2d04160F3c1fa7bc013064"
);

const troveManagerAbi = fetch(
  "https://raw.githubusercontent.com/IDKNWHORU/liquity-sepolia/main/trove-manager-abi.json"
);

const priceFeedAddress = "0x07dD4Ce17De84bA13Fc154A7FdB46fC362a41E2C";
const priceFeedAbi = fetch(
  "https://raw.githubusercontent.com/IDKNWHORU/liquity-sepolia/main/price-feed-abi.json"
);

if (!borrowerOperationAbi.ok) return "loading...";
if (!priceFeedAbi.ok) return "loading...";

const openTrove = () => {
  const borrowerOperationContract = new ethers.Contract(
    borrowerOperationAddress,
    borrowerOperationAbi.body.result,
    Ethers.provider().getSigner()
  );

  borrowerOperationContract.openTrove(
    ethers.BigNumber.from(5000000000000000),
    ethers.BigNumber.from(state.borrow * 100)
      .mul("10000000000000000")
      .toString(),
    // ethers.BigNumber.from((state.borrow * 10000000000000000).toString()),
    "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
    "0x1Bc65296aa95A0fD41d6A8AEb34C49665c6de81d",
    {
      value: ethers.BigNumber.from(
        (state.coll * 1000000000000000000).toString()
      ),
      // gasPrice: state.gasPrice,
      // gasLimit: 25000000,
    }
  );
};

State.init({
  coll: 0,
  borrow: 0,
  borrowingFee: 0,
  totalcoll: 200,
  collateralRatio: 0,
  liquidationReserve: 200,
  msg: "",
  address: undefined,
  chainId: undefined,
  balance: undefined,
  price: 0,
  isOpenTrove: undefined,
  isBlocked: true,
});

if (Ethers.provider()) {
  const signer = Ethers.provider().getSigner();
  signer.getAddress().then((address) => {
    State.update({ address });
    if (state.chainId === 11155111) {
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
        const troveManagerContract = new ethers.Contract(
          troveManagerAddress,
          troveManagerAbi.body,
          Ethers.provider().getSigner()
        );

        troveManagerContract.getTroveStatus(address).then((res) => {
          const isOpenTrove = ethers.utils.formatEther(res).includes("1");
          State.update({ isOpenTrove });
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
      priceFeedAbi.body,
      Ethers.provider().getSigner()
    );
    const troveManagerContract = new ethers.Contract(
      troveManagerAddress,
      troveManagerAbi.body,
      Ethers.provider().getSigner()
    );

    priceFeedContract.getPrice().then((priceRes) => {
      const price = Number(ethers.utils.formatEther(priceRes));

      State.update({ price });
      troveManagerContract.getTCR(priceRes).then((tcrRes) => {
        const tcr = Number(ethers.utils.formatEther(tcrRes)) * 100;

        State.update({ tcr });
      });
    });
  }
}

return (
  <>
    <div>
      <div class="TroveHead_wrapper__2deZb">
        <div class="TroveHead_body__1ysLq TroveHead_noTroveBody__2S1Gf">
          {Ethers.provider() && state.chainId !== 11155111
            ? "Change network to Sepolia"
            : state.isOpenTrove === true
            ? "You currently have an active Trove."
            : state.isOpenTrove === false
            ? "You have no active troves. Deposit to open trove."
            : null}
        </div>
      </div>
      <div class="TroveEditor_wrapper__15ofX">
        <div class="Row_row__2iFJs">
          <div class="Row_labelContainer__1QMyH">
            <div>deposit</div>
          </div>
          <div class="Input_wrapper__3ej-M">
            <input
              class="Input_input__3PNbO"
              type="number"
              placeholder="0.0000"
              min="0"
              step="0.1"
              disabled={
                !state.address ||
                state.isOpenTrove ||
                state.chainId !== 11155111
              }
              onChange={setcoll}
            />
          </div>
        </div>
        <div class="Row_row__2iFJs">
          <div class="Row_labelContainer__1QMyH">
            <div>borrow</div>
          </div>
          <div class="Input_wrapper__3ej-M">
            <input
              class="Input_input__3PNbO"
              type="number"
              placeholder="0.0000"
              min="0"
              step="100"
              disabled={
                !state.address ||
                state.isOpenTrove ||
                state.chainId !== 11155111
              }
              onChange={setBorrow}
            />
            <div class="Input_contentRight__270ZM Input_contentRightNoInfo__1aulc">
              <div class="Input_contentRightBottom__2csmy">
                <div class="Input_contentRightValues__23MfN">
                  <p class="Input_contentRightCurrency__WrZrm">LUSD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="TroveManager_container__37C51">
          <p class="ErrorDescription_wrapper__3nGA7">
            {state.msg}
            {/** highlight area */}
            <span style={{ fontWeight: "bold", whiteSpace: "nowrap" }}></span>
          </p>
          {state.address ? (
            <button
              class="Button_wrapper__1pHwk TroveManager_action__3q0yT Button_large__3F305 Button_primary__1mTxz Button_disabled__2c3jr"
              disabled=""
              disabled={state.isBlocked}
              onClick={openTrove}
            >
              Confirm
            </button>
          ) : (
            <Web3Connect connectLabel="Connect Wallet" />
          )}
        </div>
        <div>
          {state.coll > 0 ? (
            <div class="StaticRow_staticRow__3Tsxc">
              <p class="">Deposit</p>
              <p class="">
                <span class="">{state.coll}</span> ETH
              </p>
            </div>
          ) : null}
          {state.coll > 0 || state.borrow > 0 ? (
            <>
              <div class="StaticRow_staticRow__3Tsxc">
                <p class="">Liquidation Reserve</p>
                <p class="">
                  <span class="">{state.liquidationReserve}</span> LUSD
                </p>
              </div>
              <div class="StaticRow_staticRow__3Tsxc">
                <p class="">Borrowing Fee</p>
                <p class="">
                  <span class="">{state.borrowingFee.toFixed(2)}</span> LUSD
                  (0.50%)
                </p>
              </div>
            </>
          ) : null}
          {state.borrow > 0 ? (
            <div class="StaticRow_staticRow__3Tsxc">
              <p class="">Recieve</p>
              <p class="">
                {" "}
                <span class="">{state.borrow.toFixed(2)}</span> LUSD
              </p>
            </div>
          ) : null}
          {state.totalcoll > 200 ? (
            <div class="StaticRow_staticRow__3Tsxc">
              <p class="">Total debt</p>
              <p class="">
                <span class="">{state.totalcoll.toFixed(2)}</span> LUSD
              </p>
            </div>
          ) : null}
          {state.coll > 0 && state.borrow > 0 ? (
            <div class="StaticRow_staticRow__3Tsxc">
              <p class="">Collateral ratio</p>
              <p class="StaticRow_success__351Dr">
                <span>
                  <span>{state.collateralRatio.toFixed(1)}%</span>
                </span>
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  </>
);
