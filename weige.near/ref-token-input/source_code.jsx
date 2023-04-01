const accountId = context.accountId;

const REF_FI_CONTRACT = "v2.ref-finance.near";

const symbolsArr = ["e", "E", "+", "-"];

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
      fill="white"
    />
  </svg>
);

const TokenAmount = styled.div`
    background: #1A2E33;
    border-radius: 12px;
    width:430px;
    padding: 18px 16px;
    color: white;
    display: flex;
    align-items:center
`;

const Input = styled.input`
    appearance: none;
    outline: none;
    width: 100%;
    background: none;
    border: none;
    font-size:20px;
    ::placeholder{
        color:#7e8a93
    }
    color:white;
    ::-webkit-outer-spin-button, 
    ::-webkit-inner-spin-button {   
    -webkit-appearance: none; 
    }
    -moz-appearance: textfield; 
`;

const TokenWrapper = styled.div`
    display: flex;
    align-items:center;
    color:white;
    cursor:pointer;
`;

const Icon = styled.img`

  height:26px;
  width:26px;
  border-radius:100%;
`;

const Symbol = styled.span`
  margin-right:8px;
  margin-left:8px;
  font-size:18px;
`;

const account = fetch("https://rpc.mainnet.near.org", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "dontcare",
    method: "query",
    params: {
      request_type: "view_account",
      finality: "final",
      account_id: accountId,
    },
  }),
});

const shrinkToken = (value, decimals) => {
  return new Big(value || 0).div(new Big(10).pow(decimals)).toFixed();
};

const formatToken = (v) => Math.floor(v * 10_000) / 10_000;

const getBalance = (token_id) => {
  let amount;

  if (token_id === "NEAR") amount = account.body.result.amount;
  else {
    amount = Near.view(token_id, "ft_balance_of", {
      account_id: accountId,
    });
  }

  console.log(props.token, amount);
  return formatToken(shrinkToken(amount, props.token.decimals));
};

const { amount, setAmount, handleSelect, disableInput } = props;

State.init({
  show: false,
  handleClose: () => {
    State.update({
      show: false,
    });
  },
  handleOpen: () => {
    State.update({
      show: true,
    });
  },
});

const inputOnChange = (e) => {
  const value = e.target.value;

  setAmount(value);
};

const BalanceWrapper = styled.div`
   color: #304352;
   font-size:12px;
   margin-left:8px;
   padding-top:4px
`;

const Wrapper = styled.div`
   position:relative;
   margin-top: 8px
`;

const SelectToken = (
  <Widget
    src={`weige.near/widget/selectToken`}
    props={{
      show: state.show || false,
      handleClose: state.handleClose,
      handleSelect: (metadata) => {
        handleSelect(metadata);
        state.handleClose();
      },
    }}
  />
);

return (
  <Wrapper>
    <TokenAmount>
      <Input
        class="ref-token-inut"
        placeholder="0.0"
        onChange={inputOnChange}
        min="0"
        step="any"
        value={amount}
        disabled={!!disableInput}
        type="number"
        inputMode="decimal"
      />

      <TokenWrapper
        onClick={() => {
          state.handleOpen();
        }}
      >
        <Icon src={props.token.icon} />
        <Symbol>{props.token.symbol}</Symbol>
        {ArrowDown}
      </TokenWrapper>
    </TokenAmount>
    <BalanceWrapper>
      Balance: {accountId ? getBalance(props.token.id) : "-"}
    </BalanceWrapper>

    {SelectToken}
  </Wrapper>
);
