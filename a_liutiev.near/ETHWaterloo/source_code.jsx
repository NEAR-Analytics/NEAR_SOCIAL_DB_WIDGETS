State.init({
  value: "submit",
  inputSubmitLabel: "Type Message",
  web3connectLabel: "Connect Wallet",
  emptyMessage: "start the thread boss...",
  walletMessage: "View wallet data on AirStack",
  walletAddress: "",

  messageCount: 0,
  inputValue: "",
  submitMessage: "",
  messageArray: [],
  address: undefined,
  sender: undefined,
  balance,
  undefined,

  tokenData: "",
});

const API_URL =
  "https://us-central1-ethglobal-wat23-ai-hack.cloudfunctions.net/helloWorld";

const AIR_API_KEY = "6e4d51488a7546c5b9ee7a048ec3fc57";
const AIR_API = "https://api.airstack.xyz/gql";

const value = state.value || "n/a";
const web3connectLabel = state.web3connectLabel || "n/a";
const inputSubmitLabel = state.inputSubmitLabel || "n/a";
const messageCount = state.messageCount || 0;
const messageArray = state.messageArray || [];
const emptyMessage = state.emptyMessage || "";
const walletMessage = state.walletMessage || "";
const sender = state.sender || "Alex Astrum";
const walletAddress = state.walletAddress;

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0], walletAddress: accounts[0] });
    console.log("set sender", accounts[0]);
  }
}

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 2) +
        ".." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

const handleButtonClick = async () => {
  if (state.submitMessage !== "" && state.sender !== undefined) {
    State.update({
      messageCount: state.messageCount + 1,
      messageArray: [
        ...state.messageArray,
        {
          id: state.messageCount,
          sender: getSender(),
          date: new Date().toLocaleTimeString(),
          payload: state.submitMessage,
        },
      ],
    });

    fetchMessage().then((res) => {
      const data = res.body;
      State.update({
        messageCount: state.messageCount + 1,
        messageArray: [
          ...state.messageArray,
          {
            id: state.messageCount,
            sender: "AI",
            date: new Date().toLocaleTimeString(),
            payload: data.msg,
          },
        ],
      });
    });
  } else if (state.submitMessage !== "") {
    State.update({
      emptyMessage: "Ever thought of signing in...?",
    });
  } else if (state.sender !== undefined) {
    State.update({
      emptyMessage: "Maybe you should try submitting something...",
    });
  }
};

const fetchAccountBalances = () => {
  fetchBalanceRequest().then((res) => {
    let data = res.body;
    data = data.data.TokenBalances.TokenBalance;
    let total = 0;
    let tokenData = data.map(
      ({ token, formattedAmount, tokenType }) =>
        ` 
         - Token: ${
           token.symbol
         } - Token Type: ${tokenType} - Amount: ${formattedAmount.toFixed(2)}`
    );

    State.update({
      messageCount: state.messageCount + 1,
      messageArray: [
        ...state.messageArray,
        {
          id: state.messageCount,
          sender: "AI",
          date: new Date().toLocaleTimeString(),
          payload:
            `Here's more advanced token data from your wallet:
            ` + tokenData,
        },
      ],
    });
  });
};

const fetchTokenData = () => {
  fetchBalanceRequest().then((res) => {
    let data = res.body;
    console.log(data);
    data = data.data.TokenBalances.TokenBalance;

    let tokenData = data.map(
      ({ tokenType, formattedAmount, tokenAddress }) =>
        `
        - Token Type: ${tokenType}, Amount: ${formattedAmount.toFixed(
          2
        )}, Token Address: ${
          tokenAddress.substring(0, 4) + ".." + tokenAddress.slice(-4)
        }`
    );

    State.update({
      messageCount: state.messageCount + 1,
      messageArray: [
        ...state.messageArray,
        {
          id: state.messageCount,
          sender: "AI",
          date: new Date().toLocaleTimeString(),
          payload: `Here's the token data from your wallet:
            ${tokenData}`,
        },
      ],
    });
  });
};

const fetchWalletData = () => {
  fetchWalletDataRequest().then((res) => {
    let data = res.body;
    data = data.data.Wallet.addresses;
    let walletData = data[0];
    State.update({
      messageCount: state.messageCount + 1,
      messageArray: [
        ...state.messageArray,
        {
          id: state.messageCount,
          sender: "AI",
          date: new Date().toLocaleTimeString(),
          payload: `Here are your wallet details: 
          
          - ${walletData}`,
        },
      ],
    });
  });
};

const fetchBalanceRequest = async () => {
  let data =
    '{"query":"query BalanceCheck {\\n  TokenBalances(\\n    input: {filter: {owner: {_in: [\\"' +
    walletAddress +
    '\\"]}}, blockchain: ethereum, limit: 10}\\n  ) {\\n    TokenBalance {\\n      tokenAddress\\n      amount\\n      formattedAmount\\n      tokenType\\n      token {\\n        name\\n        symbol\\n      }\\n    }\\n  }\\n}","operationName":"BalanceCheck"}';

  return asyncFetch(AIR_API, {
    body: data,
    headers: {
      "Content-Type": "application/json",
      authorization: AIR_API_KEY,
    },
    method: "POST",
  });
};

const fetchWalletDataRequest = async () => {
  let data =
    '{"query":"query wallets {\\n  Wallet(input: {identity: \\"' +
    walletAddress +
    '\\", blockchain: ethereum}) {\\n    addresses\\n  }\\n}","operationName":"wallets"}';
  return asyncFetch(AIR_API, {
    body: data,
    headers: {
      "Content-Type": "application/json",
      authorization: AIR_API_KEY,
    },
    method: "POST",
  });
};

const fetchMessage = async () => {
  let data = state.messageArray[messageCount];
  data = JSON.stringify(data);
  return asyncFetch(API_URL, {
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
};

// message hander
const handleInputChange = (e) => {
  State.update({
    submitMessage: e.target.value,
  });
};

return (
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center p-3">
      <h5 className="mb-0">Chat messages</h5>
      <div className="d-flex flex-row align-items-center">
        <span className="badge bg-secondary me-3 p-2">
          {state.messageCount}
        </span>
        <Widget
          src="a_liutiev.near/widget/button_web3connect"
          props={{ web3connectLabel }}
        />
      </div>
    </div>

    <Widget
      src="a_liutiev.near/widget/display_messages"
      props={{ emptyMessage, messageArray, sender }}
    />
    {messageCount > 0 ? (
      <div class="d-flex justify-content-between align-items-center p-3 mb-0">
        <div className="d-flex flex-row align-items-center">
          <button class="btn btn-light me-2" onClick={fetchTokenData}>
            Token Stats
          </button>
          <button class="btn btn-light me-2" onClick={fetchWalletData}>
            Wallet Details
          </button>
          <button class="btn btn-light" onClick={fetchAccountBalances}>
            Account Balance Check
          </button>
        </div>
      </div>
    ) : (
      <></>
    )}
    <div class="card-footer text-muted justify-content-start align-items-center p-3">
      <Widget
        src="a_liutiev.near/widget/input_submit"
        props={{
          value,
          inputSubmitLabel,
          handleButtonClick,
          handleInputChange,
        }}
      />
    </div>
  </div>
);
