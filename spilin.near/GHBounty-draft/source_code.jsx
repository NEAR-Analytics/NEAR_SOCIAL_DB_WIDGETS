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
  activePage: "Create Bounty", // Browse Bounties, My Bounties
  prURL: "",
  rewardAsset: "",
  rewardAmount: "",
  lockPeriod: 5000000,
  debuglogs: "",
});

// https://github.com/spilin/oracle-test/pull/1

if (state.sender === undefined) {
  State.update({ sender: Ethers.send("eth_requestAccounts", [])[0] });
}

const tokens = {
  "Select Token": "",
  ORC: "0x48dfDe50Fc163CeB16dA138dDc9cfbAC1C290e58",
  BOC: "0x7ACAf6167a39BE1dfFBb542Ac848030dcDF141CF",
};
//functions for UI
const tokensMenuItems = Object.keys(tokens).map((token) => (
  <option value={tokens[token]}>{token}</option>
));

const setActive = (type) => {
  State.update({ activePage: type });
};

const setPrUrl = (evt) => {
  const val = evt.target.value;
  State.update({ prURL: val });
};
const setRewardAmount = (val) => {
  State.update({ rew: val });
};
const setRewardAsset = (val) => {
  State.update({ prURL: val });
};

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
const types = ["Create Bounty", "Browse Bounties", "My Bounties", "Info"];
const ButtonGroup = styled.div`
  display: flex;
`;

//fetch the ABI
const bountyContractAbi = fetch(
  "https://gist.githubusercontent.com/birchmd/f52cc8244be64eca036d9156486307d4/raw/66da5745b22c140bdf4eff848ab4e3aa5f0b666e/BountyProgram.abi.json"
);
if (!bountyContractAbi.ok) {
  return "scam";
}

const bountyObject = new ethers.Contract(
  state.bountyContractAddress,
  bountyContractAbi.body,
  Ethers.provider().getSigner()
);

const createBounty = () => {
  State.update({ debuglogs: state.rewardAsset });

  const output = bountyObject.createBounty(
    "https://github.com/spilin/oracle-test/pull/1",
    "0x7ACAf6167a39BE1dfFBb542Ac848030dcDF141CF",
    100,
    1000
  );

  // State.update({ debuglogs: JSON.stringify(output) });
};

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
      <div>
        <div> {state.debuglogs ?? "the logs will appear here"} </div>
        <label htmlFor="name">Task name:</label>
        <input
          value={state.prURL}
          id="prurl"
          type="text"
          onChange={(e) => State.update({ prURL: e.target.value })}
          placeholder="Enter Pull request URL"
          required
        />

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
        state.activePage == "Browse Bounties"
          ? { display: "" }
          : { display: "none" }
      }
    >
      <p> browseBounties </p>
    </div>
    <div
      style={
        state.activePage == "My Bounties"
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
