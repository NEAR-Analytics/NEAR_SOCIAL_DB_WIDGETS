const WidgetWrapper = styled.div`
margin-top: 0.5rem;
width: 400px;
// border: #755ddf 1px solid;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2); 
border-radius: 10px;
    .tab-wrapper{
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        background-color: #3a0ca3;
        border-radius: 10px 10px 0 0;
        // height: 2rem;
        padding: 0.5rem 0 0 0;
    }
    .tab{
        // margin: 0 0.5rem 0 0.5rem;
        border: none;
        border-radius: 10px 10px 0 0;
        // font-size: 1.1rem;
        padding: 0.1rem 0.75rem 0.1rem 0.75rem;
        font-weight: 500;
        &.active{
            background-color: white;
        }
        &.disabled{
            color: white;
            background-color: #755ddf;
        }
    }
    .widget-wrapper{
        padding: 1rem 1rem 1rem 1rem;
    }
`;

State.init({ selectedTab: "Borrow" });

if (Ethers.provdier()) {
  // const troveManagerContract = new ethers.Contract(
  //   troveManagerAddress,
  //   troveManagerAbi.body,
  //   Ethers.provider().getSigner()
  // );
  // troveManagerContract.getTroveStatus(state.sender).then((res) => {
  //   const isOpenTrove = ethers.utils.formatEther(res).includes("1");
  //   State.update({ isOpenTrove });
  // });
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
          state.selectedTab === "Clearance" ? "active" : "disabled"
        }`}
        onClick={() => {
          State.update({ selectedTab: "Clearance" });
        }}
      >
        Clearance
      </button>
    </div>
    <div className={`widget-wrapper`}>
      {state.selectedTab === "Borrow" ? (
        ""
      ) : state.selectedTab === "Manage" ? (
        <Widget src={`0xgh.near/widget/liquityComponentManage`} />
      ) : state.selectedTab === "Clearance" ? (
        ""
      ) : (
        ""
      )}
    </div>
  </WidgetWrapper>
);
