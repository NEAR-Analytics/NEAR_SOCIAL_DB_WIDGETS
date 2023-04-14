if (state.sender === undefined) {
  State.update({ sender: Ethers.send("eth_requestAccounts", [])[0] });
}

// if (!state.sender) return "Please login first";

//Retrieve ETH balance
if (state.balance === undefined && state.sender) {
  Ethers.provider()
    .getBalance(state.sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
}

// const sender = Ethers.send("eth_requestAccounts", [])[0];
// if (!sender) return "Please login first";

// return <p>Account: {sender}</p>;

// FETCH CSS

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://pluminite.mypinata.cloud/ipfs/Qmboz8aoSvVXLeP5pZbRtNKtDD3kX5D9DEnfMn2ZGSJWtP"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}
`,
  });
}
const Theme = state.theme;

// RETURN UI
return (
  <Theme>
    <div class="LidoContainer">
      <div onSubmit={handleSubmit}>
        <label htmlFor="name">Task name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter the name of your task"
          required
        />
        <br />
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter the description of your task"
          required
        />
        <br />
        <div>Address = {state.sender ?? "..."}</div>
        <div>
          Balance = {state.balance ?? (!state.sender ? "0" : "...")}&nbsp;ETH{" "}
        </div>
        <label htmlFor="amount">Bounty amount:</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(event) => setNearAddress(event.target.value)}
          placeholder="0.0"
          required
        />
        <br />

        {!!state.sender ? (
          <button
            class="LidoStakeFormSubmitContainer"
            onClick={() => submitEthers(state.strEther, state.sender)}
          >
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
  </Theme>
);
