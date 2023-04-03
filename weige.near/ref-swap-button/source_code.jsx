const { accountId, notEnough, canSwap, callTx } = props;

const ButtonWrapper = styled.button`
  
  border-radius: 12px;
  opacity: ${(props) => (props.notEnough || props.disabled ? "0.5" : "1")};
  background: ${(props) => (props.notEnough ? "#FF88B3" : "#00FFD1")};
  font-weight: 700ž
  font-size: 18px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")}
  color:black;
  width: 100%;
  display: flex;
  align-items:center;
  justify-content: center;
  outline:none;
  border:none;
  padding: 8px 0px;
  margin-top: 26px
`;

return (
  <ButtonWrapper
    notEnough={notEnough}
    disabled={!canSwap || notEnough}
    onClick={() => {
      if (!canSwap || notEnough) return;

      callTx();
    }}
  >
    {!accountId
      ? "Connect wallet"
      : notEnough
      ? "Insufficient Balance"
      : "Swap"}
  </ButtonWrapper>
);
