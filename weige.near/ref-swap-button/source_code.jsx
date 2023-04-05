const { accountId, notEnough, canSwap, callTx, requestSignIn, noPool } = props;

const ButtonWrapper = styled.button`
  
  border-radius: 12px;

  background-color: ${(props) =>
    props.notEnough ? "rgba(255,136,179, 0.5)" : `rgba(0,255,209, 1)`};
  font-weight: 700;
  font-size: 18px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
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
    notEnough={notEnough && accountId && !noPool}
    disabled={!accountId ? false : !canSwap || (notEnough && accountId)}
    onClick={() => {
      // if (!accountId) {
      //   return requestSignIn();
      // }

      if (!canSwap || notEnough) return;

      callTx();
    }}
  >
    {noPool
      ? "No pool"
      : !accountId
      ? "Connect wallet"
      : notEnough
      ? "Insufficient Balance"
      : "Swap"}
  </ButtonWrapper>
);
