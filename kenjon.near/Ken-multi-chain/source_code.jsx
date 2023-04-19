const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!erc20Abi.ok) {
  return "scam";
}

State.init({
  selectedTab: props.tab || "posts",
});

if (props.tab && props.tab !== state.selectedTab) {
  State.update({
    selectedTab: props.tab,
  });
}

const activityUrl = `/#/near/widget/ActivityPage`;

const Wrapper = styled.div`
  margin-top: calc(var(--body-top-padding) * -1);
  padding-bottom: 48px;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 290px minmax(0, 1fr) 290px;
  grid-gap: 16px;

  @media (max-width: 1200px) {
    display: block;
  }
`;

const Section = styled.div`
  padding-top: 24px;
  border-left: ${(p) => (p.primary ? "1px solid #ECEEF0" : "none")};
  border-right: ${(p) => (p.primary ? "1px solid #ECEEF0" : "none")};

  > div {
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom: 1px solid #eceef0;

    &:last-child {
      padding-bottom: 0;
      margin-bottom: 0;
      border-bottom: none;
    }
  }

  @media (max-width: 1200px) {
    padding-top: 0px;
    border-left: none;
    border-right: none;
    display: ${(p) => (p.active ? "block" : "none")};
    margin: ${(p) => (p.negativeMargin ? "0 -12px" : "0")};
  }
`;

const Tabs = styled.div`
  display: none;
  height: 48px;
  background: #f8f9fa;
  border-bottom: 1px solid #eceef0;
  margin-bottom: ${(p) => (p.noMargin ? "0" : p.halfMargin ? "24px" : "24px")};
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 1200px) {
    display: flex;
    margin-left: -12px;
    margin-right: -12px;

    > * {
      flex: 1;
    }
  }
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 12px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    color: #11181c;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #59e692;
  }
`;

const iface = new ethers.utils.Interface(erc20Abi.body);

initState({
  token: "",
  tokenDecimals: "",
  sendTo: "",
  sender,
  senderBalance: "0",
  receiverBalance: "0",
  receiver: "",
  amount: "1",
});

const tokens = {
  "Select Token": "",
  USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
  USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  MKR: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
};

const tokensMenuItems = Object.keys(tokens).map((token) => (
  <option value={tokens[token]}>{token}</option>
));

const setSendTo = (sendTo) => {
  const receiver = Ethers.resolveName(sendTo);
  State.update({ sendTo, receiver: receiver ?? "" });
  refreshBalances();
};

const setToken = (token) => {
  State.update({ token });
  getTokenDecimals();
};

const getTokenBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: state.token,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(state.tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

const getTokenDecimals = () => {
  const encodedData = iface.encodeFunctionData("decimals", []);

  return Ethers.provider()
    .call({
      to: state.token,
      data: encodedData,
    })
    .then((tokenDecimals) => {
      State.update({ tokenDecimals: parseInt(Number(tokenDecimals)) });
      refreshBalances();
    });
};

const refreshBalances = () => {
  getTokenBalance(state.sender).then((value) => {
    State.update({ senderBalance: value });
  });

  getTokenBalance(state.receiver).then((value) => {
    State.update({ receiverBalance: value });
  });
};

const sendTokens = () => {
  const erc20 = new ethers.Contract(
    state.token,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  let amount = ethers.utils.parseUnits(state.amount, state.tokenDecimals);

  erc20.transfer(state.receiver, amount);

  console.log("transactionHash is " + transactionHash);
};

return (
  <>
    <h3>Send ERC-20 tokens</h3>
    <div class="mb-3">
      <label for="selectToken">Select token</label>
      <select
        class="form-select"
        id="selectToken"
        onChange={(e) => {
          setToken(e.target.value);
        }}
      >
        {tokensMenuItems}
      </select>
    </div>

    <div class="mb-3">
      <label for="send-to" class="form-label">
        Recepient address
      </label>
      <input
        value={state.sendTo}
        class="form-control"
        id="send-to"
        placeholder="vitalik.eth"
        onChange={(e) => setSendTo(e.target.value)}
      />
      {state.receiver && (
        <div class="text-secondary mt-3">Resolved to {state.receiver}</div>
      )}
      {state.receiverBalance != "0" && (
        <div class="text-secondary mt-3">
          Receiver's balance: {state.receiverBalance}
        </div>
      )}

      {state.senderBalance != "0" && (
        <div class="text-secondary mt-3">
          Sender's balance: {state.senderBalance}
        </div>
      )}
    </div>

    <div class="mb-3">
      <label for="amount" class="form-label">
        Enter the amount
      </label>
      <input
        value={state.amount}
        class="form-control"
        id="amount"
        placeholder=""
        onChange={(e) => State.update({ amount: e.target.value })}
      />
    </div>
    <div class="mb-3">
      <button onClick={sendTokens}>Send</button>
    </div>
    <Wrapper negativeMargin={state.selectedTab === "posts"}>
      <Tabs
        halfMargin={state.selectedTab === "apps"}
        noMargin={state.selectedTab === "posts"}
      >
        <TabsButton
          href={`${activityUrl}?tab=posts`}
          selected={state.selectedTab === "posts"}
        >
          Posts
        </TabsButton>

        <TabsButton
          href={`${activityUrl}?tab=apps`}
          selected={state.selectedTab === "apps"}
        >
          Components
        </TabsButton>

        <TabsButton
          href={`${activityUrl}?tab=explore`}
          selected={state.selectedTab === "explore"}
        >
          Explore
        </TabsButton>
      </Tabs>

      <Main>
        <Section active={state.selectedTab === "apps"}>
          <Widget src="near/widget/FeaturedComponents" />
          <Widget src="near/widget/LatestComponents" />
        </Section>
        <Section negativeMargin primary active={state.selectedTab === "posts"}>
          <Widget src="near/widget/Posts" />
        </Section>
        <Section active={state.selectedTab === "explore"}>
          <Widget src="near/widget/ExploreWidgets" />
        </Section>
      </Main>
    </Wrapper>
  </>
);
