State.init({
  value: "submit",
  inputSubmitLabel: "Type Message",
  web3connectLabel: "Connect Wallet",
  emptyMessage: "start the thread pussy...",
  walletMessage: "View wallet data on AirChain",
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

//API https://us-central1-ethglobal-wat23-ai-hack.cloudfunctions.net/helloWorld?q=tell+me+a+joke+about+BOS

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

// message counter submit
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

    fetchData().then((res) => {
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

const fetchTokenData = () => {
  fetchTokenDataRequest().then((res) => {
    let data = res.body;
    data = data.data.TokenBalances.TokenBalance;

    let tokenData = data.map(
      ({ tokenType, formattedAmount }) =>
        `Token Type: ${tokenType}, Amount: ${formattedAmount.toFixed(2)}`
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
            "Here's the token data from your wallet - provided by AirTable" +
            tokenData,
        },
      ],
    });
  });
};

const fetchTokenDataRequest = async () => {
  let data =
    '{"query":"query MyTokenBalances {\\n  TokenBalances(\\n    input: {filter: {owner: {_eq: \\"' +
    walletAddress +
    '\\"}}, blockchain: ethereum, limit: 10}\\n  ) {\\n    TokenBalance {\\n      tokenAddress\\n      amount\\n      formattedAmount\\n      tokenType\\n      owner {\\n        addresses\\n      }\\n      tokenNfts {\\n        address\\n        tokenId\\n        blockchain\\n      }\\n    }\\n  }\\n}","operationName":"MyTokenBalances"}';

  return asyncFetch(AIR_API, {
    body: data,
    headers: {
      "Content-Type": "application/json",
      authorization: AIR_API_KEY,
    },
    method: "POST",
  });
};

const fetchNftDataRequest = async () => {
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
    {messageCount >= 0 ? (
      <div class="m-0 text-center">
        <p className="small mb-1 text-muted">
          View your
          <a href="#" onClick={fetchTokenData}>
            Token,
          </a>
          <a href="#" onClick={fetchNftDataRequest}>
            Wallet
          </a>
          &<a href="#">NFT Data</a>
          on AirChain
        </p>
      </div>
    ) : (
      <></>
    )}

    <Widget
      src="a_liutiev.near/widget/display_messages"
      props={{ emptyMessage, messageArray, sender }}
    />
    <br />
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
    <div></div>
  </div>
);
