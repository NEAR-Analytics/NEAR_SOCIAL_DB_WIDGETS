//CONSTANTS AND STATE

const contract = "prophet.poolv1.near";
const accountId = props.accountId || context.accountId;
const gas = 300 * 1000000000000;

State.init({
  stakingAmount: "",
  stakingError: "Stake",
  stakingButton: "0",
});

//HANDLERS AND FUNCTIONS

const onInputChange = ({ target }) => {
  State.update({
    stakingAmount: target.value,
    stakingError: "Stake",
    stakingButton: "1",
  });

  if (target.value >= nearBalance) {
    State.update({
      stakingError: "Max is " + nearBalance + " NEAR",
      stakingButton: "0",
    });
  } else if (target.value < 1) {
    State.update({ stakingError: "Min is 1 NEAR", stakingButton: "0" });
  } else {
    State.update({ stakingError: "Stake", stakingButton: "1" });
  }
};

const minClick = () => {
  State.update({ stakingAmount: 1, stakingError: "Stake", stakingButton: "1" });
};

const maxClick = () => {
  State.update({
    stakingAmount: nearBalance - 0.05,
    stakingError: "Stake",
    stakingButton: "1",
  });
};

const onBtnClick = () => {
  if (state.stakingButton == "1") {
    Near.call(
      contract,
      "deposit_and_stake",
      {},
      gas,
      state.stakingAmount * 1000000000000000000000000
    );
  }
};

function getAPY() {
  const result = fetch("https://metrics.linearprotocol.org", {
    method: "GET",
  });
  const apy = result.body.apy;
  if (!apy) return "-";
  return Big(apy).mul(95).toFixed(2) + "%";
}

function getNearBalance(accountId) {
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
  const { amount, storage_usage } = account.body.result;
  const COMMON_MIN_BALANCE = 0.05;
  if (!amount) return "-";
  const availableBalance = Big(amount || 0).minus(
    Big(storage_usage).mul(Big(10).pow(19))
  );
  const balance = availableBalance
    .div(Big(10).pow(24))
    .minus(COMMON_MIN_BALANCE);
  return balance.lt(0) ? "0" : balance.toFixed(5, BIG_ROUND_DOWN);
}

//STYLES

const Main = styled.div`
      color: black;
      width: 100%;
      height: 70vh;
      background: #ffffff;
  
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column
      font-family: "Times New Roman", Times, serif;
  `;

const MainCointainter = styled.div`

    width: 100%;
    height: 100%;
    background: #bdc8c4;
    text-align: center;
    border-radius: 35px;
    
`;

const StakingContainer = styled.div`

    margin: auto;
    width: 50%;
    border-style: solid;
    border-width: 3px;
    border-radius: 35px;
    border-color: black;
    background: #bdc8c4;
    
`;

const Header = styled.div`
      font-weight: bold;
      font-size: 30px;
      text-align: center;
  `;

const StakingFormContainer = styled.div`
        width: 50%;
        margin: auto;
  `;

const InputFieldAndButtons = styled.div`
        height: 20%;
        display: flex;
        flex-direction: row;
        align-items: flex-start
  `;

const InputField = styled.div`
        height: 10%;
        width: 76%;
        background: #ffffff;
        border-radius: 10px;
        text-align: center;
        margin: 5px;
  `;

const ErrorField = styled.div`

        color: brown;
        margin: 5px;
  `;

const MinMaxButton = styled.button`
        height: parent;
        width: 13%;
        background: #ffffff;
        padding: 3px 0;
        border-radius: 5px;
        text-align: center;
        margin: 5px;
  `;

const Gap = styled.div`
        height: 10px;
`;

const BigGap = styled.div`
        height: 20%;
`;

const StakeButton = styled.button`
    
    background: #CED67C;
    width: 50%;
    height: 40px;
    text-align: center;
    padding: 0px 0;
    border-radius: 10px;
    margin: auto;

}
`;
const APYLink = styled.a`
        color: black;
        text-decoration-line: underline;
`;

//RENDER SEQUENCE

const nearBalance = getNearBalance(accountId);

const stakingForm = (
  <>
    <label>Current balance is {nearBalance} NEAR</label>
    <InputFieldAndButtons>
      <InputField>
        <input
          placeholder="how much to stake"
          type="number"
          onChange={onInputChange}
          value={state.stakingAmount}
        />
      </InputField>
      <MinMaxButton onClick={minClick}>min</MinMaxButton>
      <MinMaxButton onClick={maxClick}>max</MinMaxButton>
    </InputFieldAndButtons>
    <Gap></Gap>
    <Gap></Gap>
    <StakeButton onClick={onBtnClick}>{state.stakingError}</StakeButton>
    <Gap></Gap>
  </>
);

const notLoggedInWarning = <p class="text-center py-2"> Please login to use</p>;

const APY = getAPY();

return (
  <Main>
    <a href="https://prophet.one//" target="_blank">
      <img
        style={{
          height: "10%",
          width: "auto",
          position: "absolute",
          left: "3%",
          top: "5%",
        }}
        src="https://ipfs.near.social/ipfs/bafkreiaynpmgxobhetkmyu35hzt3vuqdqbbq43gmw6vajjxd2txvxgq3ii"
        alt="Prophet Logo"
        width={"auto"}
      />
    </a>

    <MainCointainter>
      <BigGap></BigGap>
      <StakingContainer>
        <Header>Stake with Prophet</Header>

        <p>
          Current APY is
          <APYLink href="https://www.stakingrewards.com/earn/near-protocol/">
            {APY}
          </APYLink>{" "}
          (5% fee)
        </p>

        <StakingFormContainer>
          {context.accountId ? stakingForm : notLoggedInWarning}
        </StakingFormContainer>
      </StakingContainer>
    </MainCointainter>
  </Main>
);
