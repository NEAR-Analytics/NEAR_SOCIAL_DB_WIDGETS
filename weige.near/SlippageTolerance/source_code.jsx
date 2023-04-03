const SlippageWrapper = styled.div`
  align-items:center;
  justify-content: space-between;
  padding: 16px 0px 16px 8px;
  display: flex
`;

const ArrowDownWrapper = styled.div`
  transform: ${(props) =>
    props.show ? `scale(0.85) rotate(180deg)` : "scale(0.9)"};
  color: ${(props) => (props.show ? `white` : "#7e8a93")};
   position: ${(props) => (props.show ? `relative` : "")};
  top: ${(props) => (props.show ? `2px` : "")};
  cursor:pointer
`;

const ArrowDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0.231804 0.359841C0.585368 -0.0644363 1.21593 -0.12176 1.64021 0.231804L7.00003 4.69832L12.3598 0.231804C12.7841 -0.12176 13.4147 -0.0644363 13.7682 0.359841C14.1218 0.784118 14.0645 1.41468 13.6402 1.76825L7.00003 7.30173L0.359841 1.76825C-0.0644363 1.41468 -0.12176 0.784118 0.231804 0.359841Z"
      fill="currentColor"
    />
  </svg>
);

const SlippageText = styled.span`
  font-size: 12px;
  color: #7E8A93;
`;

const SettingWrapper = styled.div`
  display: flex;
  align-items:center;
  padding: 0px 8px
`;

const SettingLine = styled.div`
  border: 1px solid #1A2E33;
  width: 100%

`;

const SettingText = styled.span`
  font-size:12px;
  padding:0px 8px;
  display: flex;
  align-items:center;
  color: ${(props) => (props.show ? `white` : "#7e8a93")};
  cursor:pointer
`;

const Input = styled.input`
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
        ::placeholder{
        color:#7e8a93
    }

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

const { showSetting, setSlippagetolerance, slippagetolerance } = props;

const handleSlippageChange = (e) => {
  const value = e.target.value;

  setSlippagetolerance(value);
};

if (!showSetting) return <div />;

return (
  <>
    {!showSetting ? (
      <div />
    ) : (
      <SlippageWrapper>
        <SlippageText>Slippage Tolerance</SlippageText>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SlippageInputWrapper>
            <Input
              class="ref-fi-slippage-setting"
              placeholder="0.0"
              onChange={(e) => {
                setSlippagetolerance(e.target.value);
              }}
              max="99.99999"
              min="0"
              step="any"
              type="number"
              inputMode="decimal"
              defaultValue={"0.5"}
              value={slippagetolerance}
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
              setSlippagetolerance("0.5");
            }}
          >
            {" "}
            Auto{" "}
          </SlippageButton>
        </div>
      </SlippageWrapper>
    )}

    <SettingWrapper>
      <SettingLine />
      <SettingText
        show={props.showSetting}
        onClick={() => {
          props.updateSetting();
        }}
      >
        Setting
      </SettingText>

      <ArrowDownWrapper
        onClick={() => {
          props.updateSetting();
        }}
        show={props.showSetting}
      >
        {ArrowDown}
      </ArrowDownWrapper>
    </SettingWrapper>
  </>
);
