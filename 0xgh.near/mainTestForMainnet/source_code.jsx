const troveManageABI = [
  {
    inputs: [{ internalType: "address", name: "_borrower", type: "address" }],
    name: "getTroveStatus",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const WidgetWrapper = styled.div`
  margin: 0.5rem 0 0.5rem 0;
  width: 350px;
  height: 460px;
  // border: #755ddf 1px solid;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  .tab-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    background-color: black;
    border-radius: 10px 10px 0 0;
    // height: 2rem;
    padding: 0.5rem 0 0 0.5rem;
  }
  .tab {
    // margin: 0 0.5rem 0 0.5rem;
    border: none;
    border-radius: 10px 10px 0 0;
    // font-size: 1.1rem;
    padding: 0.1rem 0.75rem 0.1rem 0.75rem;
    font-weight: 500;
    &.active {
      background-color: white;
    }
    &.disabled {
      color: white;
      background-color: #3a0ca3;
    }
    &.notHaveTrove {
      background-color: #343a40 !important;
      color: white;
    }
  }
  .title {
    flex: 1 0 0;
    color: white;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-weight: 700;
    margin-right: 0.5rem;
  }
  .widget-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem 1rem 1rem 1rem;
    flex: 1 0 0;
  }
  .wallet-connect {
    border: 1px solid #3a0ca3;
    color: #3a0ca3;
    &:hover {
      background-color: #3a0ca3;
      color: white;
    }
  }
  .open-trove-first {
    width: 100%;
    font-size: 1.3rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

State.init({ selectedTab: "Borrow" });
const troveManageAddress = "0xA39739EF8b0231DbFA0DcdA07d7e29faAbCf4bb2";
const troveManageInterface = new ethers.utils.Interface(troveManageABI);
const troveCheckHandler = () => {
  const signer = Ethers.provider().getSigner();
  signer.getAddress().then((address) => {
    State.update({ address });

    const encodedForTroveCheck = troveManageInterface.encodeFunctionData(
      "getTroveStatus",
      [address]
    );
    Ethers.provider()
      .call({
        to: troveManageAddress,
        data: encodedForTroveCheck,
      })
      .then((raw) => {
        const receiverBalanceHex = troveManageInterface.decodeFunctionResult(
          "getTroveStatus",
          raw
        );
        const result = receiverBalanceHex[0].toString();

        State.update({ troveStatus: result });
      });
  });
};
if (Ethers.provider()) {
  troveCheckHandler();
}
return (
  <WidgetWrapper>
    <div className={`tab-wrapper`}>
      <button
        className={`tab ${
          state.selectedTab === "Borrow" ? "active" : "disabled"
        }`}
        onClick={() => {
          State.update({ selectedTab: "Borrow" });
        }}
      >
        Borrow
      </button>
      <button
        className={`tab ${
          state.selectedTab === "Manage" ? "active" : "disabled"
        }`}
        onClick={() => {
          State.update({ selectedTab: "Manage" });
        }}
      >
        Manage
      </button>
      <button
        className={`tab ${
          state.selectedTab === "Pay off" ? "active" : "disabled"
        }`}
        onClick={() => {
          State.update({ selectedTab: "Pay off" });
        }}
      >
        Pay off
      </button>
      <div className="title">Liquity</div>
    </div>
    <div className={`widget-wrapper`}>
      {state.address ? (
        state.selectedTab === "Borrow" ? (
          <Widget src={`0xgh.near/widget/liquityComponentBorrow`} />
        ) : state.selectedTab === "Manage" ? (
          state.troveStatus === "1" ? (
            <Widget src={`0xgh.near/widget/liquityComponentManage`} />
          ) : (
            <div className="open-trove-first">Open trove first</div>
          )
        ) : state.selectedTab === "Pay off" ? (
          state.troveStatus === "1" ? (
            <Widget src={`0xgh.near/widget/liquityComponentPayoff`} />
          ) : (
            <div className="open-trove-first">Open trove first</div>
          )
        ) : (
          ""
        )
      ) : (
        <Web3Connect
          className="wallet-connect"
          connectLabel="Wallet Connect First 😉"
        />
      )}
    </div>
  </WidgetWrapper>
);
