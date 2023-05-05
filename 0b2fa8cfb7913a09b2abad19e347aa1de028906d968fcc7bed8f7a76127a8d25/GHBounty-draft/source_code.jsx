// FETCH CSS
const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://pluminite.mypinata.cloud/ipfs/Qmboz8aoSvVXLeP5pZbRtNKtDD3kX5D9DEnfMn2ZGSJWtP"
).body;

initState({
  // bountyContractAddress: "0xb405a96238ca46E9d3268271F87dbBf90E4903Bf",
  bountyContractAddress: "0x6a5324A3D7BfEb6D2EBeEAA9D73350051d9E3691",
  activePage: "Bounty page", // Bounty page, Browse Bounties,  My bounties
  prURL: "",
  rewardAsset: "0x7ACAf6167a39BE1dfFBb542Ac848030dcDF141CF",
  rewardAmount: "",
  lockPeriod: 5000000,
  debuglogs: "",
});

//ABI for general ERC20
const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!erc20Abi.ok) {
  return "scam";
}

//fetch the bounty contract ABI
const bountyContractAbi = fetch(
  "https://gist.githubusercontent.com/birchmd/f52cc8244be64eca036d9156486307d4/raw/6aefe23dbeda1592bd7c9c12119ac8e8faa83564/BountyProgram.abi.json"
);
if (!bountyContractAbi.ok) {
  return "scam";
}

// https://github.com/spilin/oracle-test/pull/1

if (state.sender === undefined) {
  State.update({ sender: Ethers.send("eth_requestAccounts", [])[0] });
}

const tokens = {
  "Select Token": "",
  BYC: "0x7ACAf6167a39BE1dfFBb542Ac848030dcDF141CF",
  // ORC: "0x48dfDe50Fc163CeB16dA138dDc9cfbAC1C290e58",
  // BOC: "0x7ACAf6167a39BE1dfFBb542Ac848030dcDF141CF",
};

//functions for UI
const tokensMenuItems = Object.keys(tokens).map((token) => (
  <option value={tokens[token]}>{token}</option>
));

const setActive = (type) => {
  State.update({ activePage: type });
};

// const setPrUrl = (evt) => {
//   const val = evt.target.value;
//   State.update({ prURL: val });
// };
// const setRewardAmount = (val) => {
//   State.update({ rew: val });
// };
// const setRewardAsset = (val) => {
//   State.update({ prURL: val });
// };

const Theme = styled.div`font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; ${cssFont} ${css}`;

const Tab = styled.button`
  padding: 10px 40px;
  cursor: pointer;
  border: 0;
  outline: 0;
  color: white;
  background-color: transparent;
  border-bottom: 2px solid black;
  ${({ active }) =>
    active &&
    `     
    border-bottom: 2px solid white;
  `}
`;
const types = [
  "Create Bounty",
  "Bounty page",
  "Browse Bounties",
  "My Bounties",
  "Info",
];
const ButtonGroup = styled.div`
  display: flex;
`;

//APPROVE SPENDING

const approveSpending = () => {
  const erc20 = new ethers.Contract(
    state.rewardAsset,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  let amount = 1000000000;

  const output = erc20.approve(state.bountyContractAddress, amount);

  State.update({ debuglogs: JSON.stringify(output) });
};

const bountyObject = new ethers.Contract(
  state.bountyContractAddress,
  bountyContractAbi.body,
  Ethers.provider().getSigner()
);

const createBounty = () => {
  State.update({ debuglogs: state.rewardAsset });

  const output = bountyObject.createBounty(
    // "https://github.com/spilin/oracle-test/pull/1",
    // "0x7ACAf6167a39BE1dfFBb542Ac848030dcDF141CF",
    // 100,
    // 1000
    state.prURL,
    state.rewardAsset,
    state.rewardAmount,
    state.lockPeriod
  );

  // State.update({ debuglogs: JSON.stringify(output) });
};

//RETRIEVE BYC balance
const iface = new ethers.utils.Interface(erc20Abi.body);

const getTokenBalance = (sender) => {
  const encodedData = iface.encodeFunctionData("balanceOf", [sender]);

  return Ethers.provider()
    .call({
      to: state.rewardAsset,
      data: encodedData,
    })
    .then((rawBalance) => {
      // State.update({ debuglogs: JSON.stringify(rawBalance) });

      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      // State.update({ debuglogs: JSON.stringify(tokenDecimals) });

      const value = Big(receiverBalanceHex.toString())
        .div(Big(10).pow(state.tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");

      // State.update({ debuglogs: JSON.stringify(value) });

      return value;
    });
};

const getTokenDecimals = () => {
  const encodedData = iface.encodeFunctionData("decimals", []);

  return Ethers.provider()
    .call({
      to: state.rewardAsset,
      data: encodedData,
    })
    .then((tokenDecimals) => {
      State.update({ tokenDecimals: parseInt(Number(tokenDecimals)) });
      // refreshBalances();
    });
};

const setToken = (token) => {
  State.update({ token });
  getTokenDecimals();
};

setToken(state.rewardAsset);

getTokenBalance(state.sender).then((value) => {
  State.update({ senderBalance: value });
});

//
//
// BOUNTY PAGE
//

//
//
// BROWSE BOUNTIES
//
const ifaceBrowse = new ethers.utils.Interface(bountyContractAbi.body);

const hex2BN = (hex) => {
  let input;
  if (hex.startsWith("0x")) {
    input = hex.substring(2);
  } else {
    input = hex;
  }
  return new BN(input, 16);
};

const listOpenBounties = () => {
  const encodedData = ifaceBrowse.encodeFunctionData("listOpenBounties", []);
  State.update({ debuglogs: "function called" });

  Ethers.provider()
    .call({
      to: state.bountyContractAddress,
      data: encodedData,
    })
    .then((response) => {
      // State.update({ debuglogs: response });
      const bounties = ifaceBrowse
        .decodeFunctionResult("listOpenBounties", response)[0]
        .map((value) => {
          // The type from the `iface` decode is weird, rather than
          // try to figure it out, I'm just turning it back into
          // standard JS types by round-tripping through JSON
          // serialization.
          const xs = JSON.parse(JSON.stringify(value));
          const id = hex2BN(xs[0]["hex"]);
          const prURL = xs[1];
          const rewardAsset = xs[2];
          const rewardAmount = hex2BN(xs[3]["hex"]);
          const lockPeriod = hex2BN(xs[4]["hex"]);
          const owner = xs[5];
          return {
            id,
            prURL,
            rewardAsset,
            rewardAmount,
            lockPeriod,
            owner,
          };
        });

      //   State.update({ bounties });
      // State.update({ debuglogs: "hello" });
      State.update({ debuglogs: JSON.stringify(bounties) });
    });
};

const fetchBounties = () => {
  // State.update({ debuglogs: "hello" });
  listOpenBounties();
};

const addRow = () => {
  // const table = document.querySelector("#myTable table");
  State.update({ debuglogs: "hello" });
  const row = table.insertRow();
  row.insertCell().textContent = "item.id";
  row.insertCell().textContent = "item.prURL";
  row.insertCell().textContent = "item.rewardAsset";
  row.insertCell().textContent = "item.rewardAmount";
};

// function TableComponent() {
//   const [tableData, setTableData] = useState([]);

//   useEffect(() => {
//     fetch("https://example.com/api/data")
//       .then((response) => response.json())
//       .then((data) => setTableData(data))
//       .catch((error) => console.error(error));
//   }, []);
// }
// fetch("https://example.com/api/data")
//         .then(response => response.json())
//         .then(data => {
//           // Get reference to table body
//           const tbody = document.querySelector("#myTable tbody");

//           // Loop through data and add rows to table
//           data.forEach(item => {
//             const row = tbody.insertRow();
//             row.insertCell().textContent = item.id;
//             row.insertCell().textContent = item.prURL;
//             row.insertCell().textContent = item.rewardAsset;
//             row.insertCell().textContent = item.rewardAmount;
//           });
//         })
//         .catch(error => console.error(error));

//
//
//RETURN UI
return (
  <>
    <ButtonGroup>
      {types.map((type) => (
        <Tab
          key={type}
          active={state.activePage === type}
          onClick={() => setActive(type)}
        >
          {type}
        </Tab>
      ))}
    </ButtonGroup>
    <div
      style={
        state.activePage == "Create Bounty"
          ? { display: "" }
          : { display: "none" }
      }
    >
      <h1> Create a new bounty </h1>
      <div>
        <div> {state.debuglogs ?? "the logs will appear here"} </div>
        <label htmlFor="name">Github PR URL</label>
        <input
          value={state.prURL}
          id="prurl"
          type="text"
          onChange={(e) => State.update({ prURL: e.target.value })}
          placeholder="Paste here the URL of your github PR"
          required
        />
        <div>
          Your balance = {state.senderBalance ?? (!state.sender ? "0" : "...")}
          &nbsp;BYC{" "}
        </div>
        <label htmlFor="amount">Bounty amount:</label>
        <input
          id="amount"
          type="number"
          value={state.rewardAmount}
          onChange={(e) => State.update({ rewardAmount: e.target.value })}
          placeholder="0.0"
          required
        />
        <label for="selectToken">Select token</label>
        <select
          class="form-select"
          id="selectToken"
          onChange={(e) => State.update({ rewardAsset: e.target.value })}
        >
          {tokensMenuItems}
        </select>
        <br />

        {!!state.sender ? (
          <button
            class="LidoStakeFormSubmitContainer"
            onClick={approveSpending}
          >
            <span>Approve</span>
          </button>
        ) : (
          <Web3Connect
            className="LidoStakeFormSubmitContainer"
            connectLabel="Connect with Web3"
          />
        )}

        <br />

        {!!state.sender ? (
          <button class="LidoStakeFormSubmitContainer" onClick={createBounty}>
            <span>Submit</span>
          </button>
        ) : (
          <Web3Connect
            className="LidoStakeFormSubmitContainer"
            connectLabel="Connect with Web3"
          />
        )}
      </div>
    </div>

    <div
      class=""
      style={
        state.activePage == "Bounty page"
          ? { display: "" }
          : { display: "none" }
      }
    >
      <h1> Bounty page </h1>
      <div> {state.debuglogs ?? "the logs will appear here"} </div>
    </div>

    <div
      class=""
      style={
        state.activePage == "Browse Bounties"
          ? { display: "" }
          : { display: "none" }
      }
    >
      <h1> All bounties </h1>

      <button class="LidoStakeFormSubmitContainer" onClick={fetchBounties}>
        <span>Fetch bounties</span>
      </button>

      <button class="LidoStakeFormSubmitContainer" onClick={addRow}>
        <span>Add Row</span>
      </button>

      <div className="App" id="myTable">
        <table>
          <tr>
            <th>ID</th>
            <th>prURL</th>
            <th>Reward Asset</th>
            <th>Reward Amount</th>
          </tr>
          <tr>
            <td>Anom</td>
            <td>19</td>
            <td>Male</td>
          </tr>
          <tr>
            <td>Megha</td>
            <td>19</td>
            <td>Female</td>
          </tr>
        </table>
      </div>

      <div>{state.debuglogs ?? "the logs will appear here"}</div>
    </div>
    <div
      style={
        state.activePage == "My bounties"
          ? { display: "" }
          : { display: "none" }
      }
    >
      <p> myBounties </p>
    </div>

    <div
      style={state.activePage == "Info" ? { display: "" } : { display: "none" }}
    >
      <div>Address = {state.sender ?? "..."}</div>
      <div>
        Balance = {state.balance ?? (!state.sender ? "0" : "...")}&nbsp;ETH{" "}
      </div>
      <div> {state.debuglogs ?? "the logs will appear here"} </div>
    </div>
  </>
);
