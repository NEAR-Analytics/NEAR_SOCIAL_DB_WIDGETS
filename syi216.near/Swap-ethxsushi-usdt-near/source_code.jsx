const lidoContract = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";

const mainnetLidoContract = "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f";
const gorliLidoContract = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";
const tokenDecimals = 18;
const contract = "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2";

const network = "mainnet";
switch (network) {
  case "gorli":
    lidoContract = gorliLidoContract;
    break;
  case "mainnet":
    lidoContract = mainnetLidoContract;
    break;
  case "ropsten":
    lidoContract = mainnetLidoContract;
    break;
  default:
    lidoContract = mainnetLidoContract;
    break;
}

const handleSelect = (data) => {
  console.log(data.target.value);
  let info = data.target.value.split("-");
  State.update({ tokenTo: info[1] });
  if (info[0] == "sushi") {
    State.update({ tokenSelected: 0 });
  } else if (info[0] == "usdt") {
    State.update({ tokenSelected: 1 });
  } else if (info[0] == "near") {
    State.update({ tokenSelected: 2 });
  }
  console.log(state.tokenSelected);
  contract = data.target.value;
};

const lidoAbi = fetch(
  "https://raw.githubusercontent.com/cloudmex/sushiswap-bos/main/abi-sushi.json"
);

console.log(lidoAbi);

if (!lidoAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(lidoAbi.body);

const submitEthers = (strEther, _referral) => {
  if (!strEther) {
    console.log("contrato: ", state.tokenTo);
    return console.log("Amount is missing");
  }

  const erc20 = new ethers.Contract(
    lidoContract,
    lidoAbi.body,
    Ethers.provider().getSigner()
  );
  console.log("11111", erc20);
  let amount = ethers.utils.parseUnits(strEther, tokenDecimals).toHexString();

  //uint amountOutMin, address[] calldata path, address to, uint deadline
  //const ETHaddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
  //const usdtContract = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
  //const sushiMainContract = "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2"

  let ARR = ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", state.tokenTo];

  erc20
    .swapExactETHForTokens(amount, ARR, state.sender, Date.now() + 180, {
      value: amount,
    })
    .then((transactionHash) => {
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
  State.update({ tokenTo: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2" });
  State.update({ tokenSelected: 0 });
  Ethers.provider()
    .getBalance(state.sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(5) });
    });
}

// FETCH CSS

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://nativonft.mypinata.cloud/ipfs/QmY1vEGq8a9e3n25g9A57eLd7bMWdVKipYHJYRpx1R5yij"
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
    <div class="LidoContainer">
      <div class="Header">Swap $ETH &lt;&gt; $SUSHI/$USDT/$NEAR</div>
      <div class="SubHeader">Swap ETH and receive SUSHI</div>

      <div class="LidoForm">
        {state.sender && (
          <>
            <div class="LidoFormTopContainer">
              <div class="LidoFormTopContainerLeft">
                <div class="LidoFormTopContainerLeftContent1">
                  <div class="LidoFormTopContainerLeftContent1Container">
                    <span>Available to swap</span>
                    <div class="LidoFormTopContainerLeftContent1Circle" />
                  </div>
                </div>
                <div class="LidoFormTopContainerLeftContent2">
                  <span>
                    {state.balance ?? (!state.sender ? "0" : "...")}&nbsp;ETH
                  </span>
                </div>
              </div>
              <div class="LidoFormTopContainerRight">
                <div class="LidoFormTopContainerRightContent1">
                  <div class="LidoFormTopContainerRightContent1Text">
                    <span>
                      <b>Account:</b> {getSender()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="LidoSplitter" />
          </>
        )}
      </div>
      <div class="LidoStakeForm">
        <div class="mb-2 LidoStakeFormInputContainer">
          <select
            name="select"
            id="token"
            class="selectCSS"
            onChange={handleSelect}
          >
            <option value="sushi-0x6b3595068778dd592e39a122f4f5a5cf09c90fe2">
              SUSHI
            </option>
            <option value="usdt-0xdAC17F958D2ee523a2206206994597C13D831ec7">
              USDT
            </option>
            <option value="near-0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4">
              NEAR
            </option>
          </select>
        </div>

        <div class="LidoStakeFormInputContainer">
          <span class="LidoStakeFormInputContainerSpan1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
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
              placeholder="Amount"
            />
          </span>
          <span
            class="LidoStakeFormInputContainerSpan3"
            onClick={() => {
              State.update({
                strEther: parseFloat(state.balance).toFixed(2),
              });
            }}
          >
            <button
              class="LidoStakeFormInputContainerSpan3Content"
              disabled={!state.sender}
            >
              <span class="LidoStakeFormInputContainerSpan3Max">MAX</span>
            </button>
          </span>
        </div>
        {!!state.sender ? (
          <button
            class="LidoStakeFormSubmitContainer"
            onClick={() => submitEthers(state.strEther, state.sender)}
          >
            <span>Swap</span>
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
