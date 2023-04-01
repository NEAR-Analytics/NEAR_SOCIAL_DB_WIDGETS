const SlippageWrapper = styled.div`
  align-items:center;
  justify-content: space-between;
  padding: 16px 0px 16px 8px;
  display: ${(props) => (props.show ? "flex" : "none")}

`;

const SlippageText = styled.span`
  font-size: 12px;
  color: #7E8A93;
`;

const SlippageInput = styled.input`
    appearance: none;
    outline: none;
    background: none;
    border: none;
    width: 50px;
    font-size: 12px;
    color: #7E8A93;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {   
    -webkit-appearance: none; 
    }
    -moz-appearance: textfield; 
`;

const SlippageInputWrapper = styled.div`
  padding: 2px 4px;
  border: 1px solid #304352;
  border-radius: 6px;
  display:flex;
  align-items:center
`;

const SlippageButton = styled.button`
  background: #304352;
  border-radius: 6px;
  border:none;
  color:white;
  font-size: 12px;
  padding: 4px 8px;
  margin-left: 8px


`;

const { slippagetolerance, setSlippagetolerance, showSetting } = props;

const handleSlippageChange = (e) => {
  const value = e.target.value;

  setSlippagetolerance(Number(value));
};

return (
  <SlippageWrapper show={showSetting}>
    <SlippageText>Slippage Tolerance</SlippageText>

    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <SlippageInputWrapper>
        <SlippageInput
          class="ref-fi-slippage-input"
          type="number"
          max={99.99999}
          min={0}
          step="any"
          onChange={handleSlippageChange}
        />
        <span
          style={{
            color: "#7e8a93",
            fontSize: "12px",
          }}
        >
          %
        </span>
      </SlippageInputWrapper>

      <SlippageButton
        onClick={() => {
          setSlippagetolerance(0.5);
        }}
      >
        {" "}
        Auto{" "}
      </SlippageButton>
    </div>
  </SlippageWrapper>
);
