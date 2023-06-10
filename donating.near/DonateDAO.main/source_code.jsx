// TO-DO
// hookup to paymster, show transactionr ecipet
// show balance of USDC of connected wallet
// put usdc address on ZKSync
// check connect address instead of deposit
// configure dropw down reciever
// show the on chain mimum balance amount
// add zk account
if (state.chainId !== undefined && state.chainId !== 280) {
  return <p>Switch to ZKSync Testnet</p>;
} // not sure if this is working
// https://era.zksync.io/docs/dev/building-on-zksync/useful-address.html
State.init({
  reciever: "0xDoodoo",
}); // write now state reciever is in clipboard
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

const { action, amount, USDCbalance } = state;
const { assets } = deposit;
// need to get USDC balance form on CHain

const actionTitle = isDeposit ? "Donate" : "Withdraw";

const donate = () => {
  // add payment to charity logic here
};

const handleMax = () => {
  State.update({ amount: USDCbalance.balance });
}; // how to get max of selectedasset

const handleAmountChange = (e) => {
  State.update({ amount: e.target.value });
};
const handleRecieverChange = (e) => {
  State.update({ reciever: e.target.value });
};

const handleCharityChange = (e) => {
  State.update({
    reciever: charityList?.find((a) => a.address === e.target.value),
  });
}; // need to change this around

const Container = styled.div`
    max-width: 90%;
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

const sender = Ethers.send("eth_requestAccounts", [])[0];
const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
const usdcZKtestnet = "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4";
const paymasterZKtestnet = "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}
`,
  });
}
const Theme = state.theme;
const paymasterContract = "";
const tokenDecimals = 18; // double check on contract
// FETCH Paymaster ABI

// see if API3 can be fetched here

const paymasterABI = fetch(
  "https://raw.githubusercontent.com/codingshot/zksync-paymaster/main/paymaster-abi.json"
);
if (!paymasterABI.ok) {
  return "Loading";
}
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
          <span>
            {" "}
            USDC Balance:
            {USDCbalance}
          </span>
        </div>
        <div className="balance input-group">
          <input
            style={{ maxWidth: "100%" }}
            type="number"
            min="0"
            step="0.1"
            defaultValue={props.amount}
            value={amount}
            placeholder="0.00"
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
            {charityList &&
              charityList.map((charity) => (
                <option value={charity.title} selected={charity.selected}>
                  {charity.title}
                </option>
              ))}
            // add reciever logic here
          </select>
        </div>
        <div className="balance input-group">
          <input
            style={{ maxWidth: "100%" }}
            type="string"
            defaultValue={props.amount}
            value={reciever}
            placeholder={state.reciever}
            onChange={handleRecieverChange}
          />
        </div>
      </div>
      <div className="border border-secondary border-bottom-0 border-light" />

      <div className="border border-secondary border-bottom-0 border-light" />
      {!!state.sender ? (
        <div className="p-4 d-grid gap-3">
          <button
            className="action btn btn-primary"
            onClick={donate}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : actionTitle}
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
            className="btn btn-secondary col-6"
            connectLabel="Connect To ZkSync"
          />
          <button
            className=" btn btn-primary col-6"
            onClick={donate}
            disabled={isLoading}
          >
            {chainId != 280 ? "Connect to Donate" : "Donate"}
          </button>
        </div>
      )}
    </Container>
    <div>
      <h1>Debug</h1>
      <p>Input USDC Amount: {state.amount}</p>
      <p>Input Reciever Address: {state.reciever}</p>
    </div>
    <Widget src="donating.near/widget/DonateDAO.dropdown" />
  </Theme>
);
