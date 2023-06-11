// TO-DO
// hookup to paymster & import abi
// show balance of ERC20 of connected wallet
// call in donate
// NICE TO HAVE
// - show transactionr reciept of donation
// configure dropw down receiver
// add zk account
const sender = Ethers.send("eth_requestAccounts", [])[0];
let networkId = Ethers.provider()._network.chainId;

// const yourAddress = Ethers.provider().getSigner();
// https://era.zksync.io/docs/dev/building-on-zksync/useful-address.html
const initalAmount = 1;
State.init({
  receiver: "0xPlaceholder",
  networkId,
  sender,
  amount: initalAmount,
  token: "0x5DBAFaccAADa3E16213de291fA5e39c1996093D5",
  balance: 0,
  tokenDecimals: "18",
});
if (
  state.networkId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ networkId: chainIdData.chainId });
      }
    });
}

console.log("Network ID - " + state.networkId); // not working
console.log("Your ETH Address - " + state.sender);

// Support ZKSync
if (state.chainId !== undefined && state.chainId !== 280) {
  return (
    <div>
      <h3>Wrong Network - We currently support the ZKSync Era Testnet</h3>
    </div>
  );
}
const getEVMAccountId = () => {
  if (ethers !== undefined) {
    return Ethers.send("eth_requestAccounts", [])[0] ?? "";
  }
  return "";
};
// need to have the search result updated and selected in state

// Charity helper functions
function loadCharities() {
  const res = fetch(
    "https://raw.githubusercontent.com/codingshot/donatedao-landing/main/data/charityList.json"
  );
  return res.body && JSON.parse(res.body);
}
const charityList = loadCharities();
if (!charityList) {
  return "⧗ Loading Charities...";
}

const PAYMASTER_ADDRESS = "0xaB23B553781757a8ebdFb11A9231825ff4EE4118";
// https://goerli.explorer.zksync.io/address/0xaB23B553781757a8ebdFb11A9231825ff4EE4118
const TOKEN_ADDRESS = "0x5DBAFaccAADa3E16213de291fA5e39c1996093D5";
// https://goerli.explorer.zksync.io/address/0x5DBAFaccAADa3E16213de291fA5e39c1996093D5
const tokenDecimals = 18; // double check on contract
const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
const paymasterABI = fetch(
  "https://raw.githubusercontent.com/codingshot/donatedao-landing/main/data/paymaster-whitelist-abi.json"
); // updated with whitelist
//   "https://raw.githubusercontent.com/codingshot/zksync-paymaster/main/paymaster-abi.json"
if (!paymasterABI.ok) {
  return "Paymaster ABI Not ok";
}
const tokenIFace = new ethers.utils.Interface(erc20Abi.body);
// get receiver
console.log("Token Interface is:  -  " + tokenIFace);
const getTokenBalance = () => {
  const encodedData = tokenIFace.encodeFunctionData("balanceOf", [
    state.sender,
  ]);

  return Ethers.provider()
    .call({
      to: TOKEN_ADDRESS,
      data: encodedData,
    })
    .then((rawBalance) => {
      const senderBalanceHex = tokenIFace.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      console.log(senderBalanceHex.toString());
      const balanceBig = Big(senderBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
      State.update({ balance: balanceBig });
      console.log("Updated Balance: " + state.balance);
      return Big(senderBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
}; // how to update here
//  const ifaceErc20 = new ethers.utils.Interface(state.erc20Abi);
// const contract = new ethers.Contract(contractAddress, erc20Abi);

const ifacePaymaster = new ethers.utils.Interface(paymasterABI.body);

const donate = () => {
  // add payment to charity logic here // this is where you hit paymaster
  console.log("Add paymaster donate logic here");
  getTokenBalance();
};
const handleMax = () => {
  State.update({ amount: state.balance });
  console.log("New Amount: " + state.amount);
}; // how to get max of selectedasset

const handleAmountChange = (e) => {
  State.update({ amount: e.target.value });
  console.log("Your ERC20 Amount: " + state.amount);
};
const handleReceiverChange = (e) => {
  State.update({ receiver: e.target.value });
  console.log("Charity Address: " + state.receiver);
};

const handleCharityChange = (e) => {
  State.update({
    receiver: charityList
      .filter((charity) => charity.title === e.target.value)
      .map((el) => el.address)[0],
  });
  console.log(
    charityList
      .filter((charity) => charity.title === e.target.value)
      .map((el) => el.address)[0]
  );
}; // need to change this around

const Container = styled.div`
    max-width: 95%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid gray;
    padding-top: 1rem;
    border-radius: 0.5rem;
    margin-top: 1rem;

    * {
        font-family: 'Inter custom',sans-serif;
    }
 

    background: white;
    color: black;

    .title {
      margin-top: 8px;
    }

    .actionTabs {
      border: 1px solid black;
      height: 38px;

      input:checked + label {
        color: black;
      }

      label {
        color: gray;
        background: white !important;
        border: 1px solid black !important;
        height: 38px;
        
        &:hover {
          color: black;
        }
      }
    }

    button.max {
      border: 1px solid black;
    }

    button.action {
      background-color: black;
    }

    .action {
      background: black;
      color: white;
    }

    .balance {
      input {
        height: 38px;
        background: #f5f6fd;
        color: black;
        border: 1px solid black;
      }

    }

    .assets {
      select {
        background: #f5f6fd;
        color: black;
      }
    }
`;

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}
`,
  });
}
// overlay
State.init({
  show: false,
});
const handleOnMouseEnter = () => {
  State.update({ show: true });
};
const handleOnMouseLeave = () => {
  State.update({ show: false });
};

const overlay = (
  <div
    className="border m-3 p-3 rounded-4 bg-white shadow"
    style={{ maxWidth: "24em", zIndex: 1070 }}
    onMouseEnter={handleOnMouseEnter}
    onMouseLeave={handleOnMouseLeave}
  >
    This is custom ERC 20 Token Deploy on ZK Testnet
  </div>
);

const Theme = state.theme;

// add conditional for charity // this should be emitted as an error from the smart contract
return (
  <Theme>
    <Container>
      <div className="d-flex gap-4 align-items-center mb-3 justify-content-center">
        <h1 className="title">🙏 DonateDAO</h1>
      </div>
      <div className="border border-secondary border-bottom-0 border-light" />
      <div className="p-2">
        <div className="d-flex justify-content-between">
          <OverlayTrigger
            show={state.show}
            trigger={["hover", "focus"]}
            delay={{ show: 250, hide: 300 }}
            placement="auto"
            overlay={overlay}
          >
            <span>
              {" "}
              <a
                href={
                  "https://goerli.explorer.zksync.io/address/" + state.token
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                MOCK USDC
              </a>{" "}
              Balance:
              {state.balance}
            </span>
          </OverlayTrigger>
        </div>
        <div className="balance input-group">
          <input
            style={{ maxWidth: "100%" }}
            type="number"
            min=".5"
            step="0.1"
            defaultValue={state.amount}
            value={amount}
            placeholder={state.amount}
            onChange={handleAmountChange}
          />
          <button className="btn btn-light btn-sm max" onClick={handleMax}>
            max
          </button>
        </div>
        <label>Charity Address</label>
        <div className="charities">
          <select
            className="form-select"
            aria-label="select asset"
            onChange={handleCharityChange}
          >
            <option selected disabled>
              {" "}
              Select a charity
            </option>
            {charityList &&
              charityList.map((charity) => (
                <option value={charity.title} selected={charity.selected}>
                  {charity.title}
                </option>
              ))}
            // add receiver logic here
          </select>
        </div>
        <div className="balance input-group">
          <input
            style={{ maxWidth: "100%" }}
            type="string"
            defaultValue={props.amount}
            value={receiver}
            placeholder={state.receiver}
            onChange={handleReceiverChange}
          />
        </div>
      </div>
      <div className="border border-secondary border-bottom-0 border-light" />

      <div className="border border-secondary border-bottom-0 border-light" />
      {!!state.sender ? (
        <div className="p-4 d-grid gap-3">
          <button className="action btn btn-primary" onClick={donate}>
            Donate
          </button>
          {log && (
            <div className="alert alert-success" role="alert">
              <div className="text-truncate" style={{ maxWidth: 300 }}>
                {log}
              </div>
              <a href={explorerLink} className="alert-link" target="_blank">
                Etherscan
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="row">
          <Web3Connect
            className="btn btn-secondary"
            connectLabel="Connect To ZkSync"
          />
          <button className=" btn btn-primary" onClick={donate}>
            Donate
          </button>
        </div>
      )}
    </Container>
  </Theme>
);
