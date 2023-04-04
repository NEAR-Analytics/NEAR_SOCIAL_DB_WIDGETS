const ownerId = "manzanal.near";
const StakingSelector = styled.div`
    border-radius: 24px;
    background-color: #ffffff;
    border: 1px solid #c0c5c1;
    display: flex;
    justify-content: space-around;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    flex-direction: row;

  `;
return (
  <StakingSelector className={props.className || ""}>
    <Widget
      src={`${ownerId}/widget/LiquidStake.Toggle`}
      props={{
        ...props.toggle1,
        active: props.active,
        onClickTab: props.onClickTab,
      }}
    />
    <Widget
      src={`${ownerId}/widget/LiquidStake.Toggle`}
      props={{
        ...props.toggle2,
        active: props.active,
        onClickTab: props.onClickTab,
      }}
    />
    <Widget
      src={`${ownerId}/widget/LiquidStake.Toggle`}
      props={{
        ...props.toggle3,
        active: props.active,
        onClickTab: props.onClickTab,
      }}
    />
  </StakingSelector>
);
