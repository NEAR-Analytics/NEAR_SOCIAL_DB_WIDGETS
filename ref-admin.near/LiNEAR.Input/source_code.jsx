const InputWrapper = styled.div`
  width: 100%;
  color: white;
`;

const HorizentalLine = styled.hr`
  height: 1px;
  border: none;
  background: #304352;
  margin-top: 2px;
  margin-bottom: 8px;
`;

const BalanceContainer = styled.div`
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  .error {
    color: #ec6868;
  }
  p{
    margin-bottom:30px;
  }
`;

const NEARInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NEARTexture = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
`;

const LogoWithText = styled.div`
  display: flex;
  align-items: center;
`;

const MaxTexture = styled.div`
  font-size: 16px;
  color: #7E8A93;
  cursor: pointer;
`;

return (
  <InputWrapper>
    <NEARInputContainer>
      <input
        style={{
          width: "100%",
          background: "transparent",
          border: "0",
          "font-size": "16px",
          "font-weight": "bold",
          "padding-left": "0px",
          color: props.inputError ? "#ec6868" : "#fff",
          outline: "none",
          "box-shadow": "none",
          "margin-right": "16px",

          "-webkit-appearance": "none",
          "-moz-appearance": "textfield",
        }}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      <MaxTexture onClick={props.onClickMax}>MAX</MaxTexture>
    </NEARInputContainer>
    <HorizentalLine />
    <BalanceContainer>
      <p>Balance: {props.balance}</p>
      <p className="error">{props.inputError}</p>
    </BalanceContainer>
  </InputWrapper>
);
