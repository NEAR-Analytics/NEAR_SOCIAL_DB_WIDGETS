if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}
if (state.chainId !== undefined && state.chainId !== 1) {
  return <p>Switch to Ethereum Mainnet</p>;
}

// FETCH LIDO ABI

const lidoContract = "0xae7ab96520de3a18e5e111b5eaab095312d7fe84";
const tokenDecimals = 18;

const lidoAbi = fetch(
  "https://raw.githubusercontent.com/lidofinance/lido-subgraph/master/abis/Lido.json"
);
if (!lidoAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(lidoAbi.body);

// FETCH LIDO STAKING APR

if (state.lidoArp === undefined) {
  const apr = fetch(
    "https://api.allorigins.win/get?url=https://stake.lido.fi/api/sma-steth-apr"
  );
  if (!apr) return;
  State.update({ lidoArp: JSON.parse(apr?.body?.contents) ?? "..." });
}

// HELPER FUNCTIONS

const getStakedBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: lidoContract,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

const submitEthers = (strEther, _referral) => {
  if (!strEther) {
    return console.log("Amount is missing");
  }
  const erc20 = new ethers.Contract(
    lidoContract,
    lidoAbi.body,
    Ethers.provider().getSigner()
  );

  let amount = ethers.utils.parseUnits(strEther, tokenDecimals).toHexString();

  erc20.submit(lidoContract, { value: amount }).then((transactionHash) => {
    console.log("transactionHash is " + transactionHash);
  });
};

// DETECT SENDER

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    console.log("set sender", accounts[0]);
  }
}

//if (!state.sender)  return "Please login first";

// FETCH SENDER BALANCE

if (state.balance === undefined && state.sender) {
  Ethers.provider()
    .getBalance(state.sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
}

// FETCH SENDER STETH BALANCE

if (state.stakedBalance === undefined && state.sender) {
  getStakedBalance(state.sender).then((stakedBalance) => {
    State.update({ stakedBalance });
  });
}

// FETCH TX COST

if (state.txCost === undefined) {
  const gasEstimate = ethers.BigNumber.from(1875000);
  const gasPrice = ethers.BigNumber.from(1500000000);

  const gasCostInWei = gasEstimate.mul(gasPrice);
  const gasCostInEth = ethers.utils.formatEther(gasCostInWei);

  let responseGql = fetch(
    "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          bundle(id: "1" ) {
            ethPrice
          }
        }`,
      }),
    }
  );

  if (!responseGql) return "";

  const ethPriceInUsd = responseGql.body.data.bundle.ethPrice;

  const txCost = Number(gasCostInEth) * Number(ethPriceInUsd);

  State.update({ txCost: `$${txCost.toFixed(2)}` });
}

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

// OUTPUT UI

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

return (
  <Theme>
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

    <div style={{ display: "flex", marginBottom: "50px", marginTop: "20px" }}>
      <div
        style={
          {
            /* Add any additional styling for the first LidoContainer */
          }
        }
      >
        <div class="LidoContainer">
          <div class="Header">VOTERS</div>
          <div class="SubHeader">
            Claim $PRAGUE and vote on growing project .
          </div>

          <div class="LidoStakeForm" style={{ marginTop: "20px" }}>
            <div class="LidoStakeFormInputContainer">
              <span class="LidoStakeFormInputContainerSpan1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    opacity="0.6"
                    d="M11.999 3.75v6.098l5.248 2.303-5.248-8.401z"
                  ></path>
                  <path d="M11.999 3.75L6.75 12.151l5.249-2.303V3.75z"></path>
                  <path
                    opacity="0.6"
                    d="M11.999 16.103v4.143l5.251-7.135L12 16.103z"
                  ></path>
                  <path d="M11.999 20.246v-4.144L6.75 13.111l5.249 7.135z"></path>
                  <path
                    opacity="0.2"
                    d="M11.999 15.144l5.248-2.993-5.248-2.301v5.294z"
                  ></path>
                  <path
                    opacity="0.6"
                    d="M6.75 12.151l5.249 2.993V9.85l-5.249 2.3z"
                  ></path>
                </svg>
              </span>
              <span class="LidoStakeFormInputContainerSpan2">
                <input
                  disabled={!state.sender}
                  class="LidoStakeFormInputContainerSpan2Input"
                  value={state.strEther}
                  onChange={(e) => State.update({ strEther: e.target.value })}
                  placeholder="250"
                />
              </span>
              <span
                class="LidoStakeFormInputContainerSpan3"
                onClick={() => {
                  State.update({
                    strEther: (state.balance > 0.05
                      ? parseFloat(state.balance) - 0.05
                      : 0
                    ).toFixed(2),
                  });
                }}
              >
                <button
                  class="LidoStakeFormInputContainerSpan3Content"
                  disabled={!state.sender}
                >
                  <span class="LidoStakeFormInputContainerSpan3Max">Claim</span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginLeft:
            "10px" /* Add any additional styling for the second LidoContainer */,
        }}
      >
        <div class="LidoContainer">
          <div class="Header">GRANTEES</div>
          <div class="SubHeader">Submit a proposal and get funding.</div>

          <div class="LidoStakeForm" style={{ marginTop: "20px" }}>
            <div class="LidoStakeFormInputContainer">
              <span class="LidoStakeFormInputContainerSpan2">
                <input
                  disabled={!state.sender}
                  class="LidoStakeFormInputContainerSpan2Input"
                  value={state.strEther}
                  onChange={(e) => State.update({ strEther: e.target.value })}
                  placeholder="Bio"
                />
              </span>
              <span
                class="LidoStakeFormInputContainerSpan3"
                onClick={() => {
                  State.update({
                    strEther: (state.balance > 0.05
                      ? parseFloat(state.balance) - 0.05
                      : 0
                    ).toFixed(2),
                  });
                }}
              >
                <button
                  class="LidoStakeFormInputContainerSpan3Content"
                  disabled={!state.sender}
                >
                  <span class="LidoStakeFormInputContainerSpan3Max">
                    Submit
                  </span>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Widget
      src="ethpraguedemo.near/widget/Progress-Pool-Proposals"
      props={{}}
    />
  </Theme>
);
