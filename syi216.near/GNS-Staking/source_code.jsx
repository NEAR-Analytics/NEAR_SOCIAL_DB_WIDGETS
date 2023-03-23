// FETCH LIDO ABI

const lidoContract = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";

//Contrato de gains bridge
const gbContract = "0xDF774A4F3EA5095535f5B8f5b9149caF90FF75Bd";
const gnsLZContract = "0x3c2269811836af69497E5F486A85D7316753cf62";
const gnsToken = "0xE5417Af564e4bFDA1c483642db72007871397896";
const gnsStaking = "0xFb06a737f549Eb2512Eb6082A808fc7F16C0819D";

const mainnetLidoContract = "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f";
const gorliLidoContract = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";
const tokenDecimals = 18;
const contract = "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2";

//const sushiTokenContract = "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f";

//const network = "gorli"; // "gorli" // "rinkeby" // "mainnet"

const network = "mainnet";
switch (network) {
  case "gorli":
    lidoContract = gbContract;
    break;
  case "mainnet":
    lidoContract = gbContract;
    break;
  case "ropsten":
    lidoContract = gbContract;
    break;
  default:
    lidoContract = gbContract;
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
  "https://nativonft.mypinata.cloud/ipfs/QmawuBDkx1w56AFpZ2hiph1gaVrnq3gyAMRnSH2c9S54TY"
);

const gnsLZEndAbi = fetch(
  "https://nativonft.mypinata.cloud/ipfs/Qmd3xkYoDxS7ATdvoDzTgF1ojLog7kTqoTeWBhJQfUZ4F9"
);

const gnsTokenAbi = fetch(
  "https://nativonft.mypinata.cloud/ipfs/QmRNckfDbxxjHBhHqMWewKg2dxfUXpoCumxS6YGRW4uAhq"
);

const gnsStakingAbi = fetch(
  "https://nativonft.mypinata.cloud/ipfs/QmXj2sEUz2RNubsnnAt5hpBBeHtRzhVMZvJ8vVG5WwTcND"
);

console.log(lidoAbi);

if (!lidoAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(lidoAbi.body);

// FETCH LIDO STAKING APR

/*if (state.lidoArp === undefined) {
  const apr = fetch(
    "https://api.allorigins.win/get?url=https://stake.lido.fi/api/sma-stgns-apr"
  );
  if (!apr) return;
  State.update({ lidoArp: JSON.parse(apr?.body?.contents) ?? "..." });
}*/

// HELPER FUNCTIONS

const getStakedBalance = (receiver) => {
  const contractGNSStaking = new ethers.Contract(
    gnsStaking,
    gnsStakingAbi.body,
    Ethers.provider().getSigner()
  );
  contractGNSStaking
    .users(Ethers.provider().getSigner().getAddress())
    .then((res) => {
      console.log(res[0]);
      return Big(res[0]).div(Big(10).pow(18)).toFixed(2);
    });
};

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

  const contractGNSLZ = new ethers.Contract(
    gnsLZContract,
    gnsLZEndAbi.body,
    Ethers.provider().getSigner()
  );

  const contractGNSTOK = new ethers.Contract(
    gnsToken,
    gnsTokenAbi.body,
    Ethers.provider().getSigner()
  );

  const contractGNSStaking = new ethers.Contract(
    gnsStaking,
    gnsStakingAbi.body,
    Ethers.provider().getSigner()
  );

  console.log("11111", erc20);
  console.log("contrato GNSLZ", contractGNSLZ);
  console.log("contrato GNS Token", contractGNSTOK);
  console.log("contrato GNS Staking", contractGNSStaking);
  let amount = ethers.utils.parseUnits(strEther, tokenDecimals).toHexString();

  contractGNSStaking
    .stakeTokens(amount, { gasLimit: 3e6 })
    .then((transactionHash) => {
      console.log("transactionHash is " + transactionHash);
    });
  // contractGNSTOK.balanceOf(state.sender).then((res) => {
  //   console.log("balance GNS", Big(res).div(Big(10).pow(18)).toFixed(2));
  // });
  // erc20.bridgeTokens(dstChainID, amount, { value: amount, gasLimit: 3e3 });
  //
  //uint amountOutMin, address[] calldata path, address to, uint deadline
  //const ETHaddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
  //const SUSHIaddress = "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2";
  //const usdtContract = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
  //const sushiMainContract = "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2"

  //   let ARR = ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", state.tokenTo];

  //   console.log("contract: ", contract);

  //   console.log("amountlol", amount);
  //   console.log("ARRlol", ARR);
  //   console.log(
  //     "Ethers.provider().getSigner()l",
  //     Ethers.provider().getSigner().getAddress()
  //   );
  //   console.log("Sender:", state.sender);
  //   console.log("block.timestamp + 60 1678849571");
  //   console.log("token to swap: ", state.tokenTo);
  //   erc20
  //     .swapExactETHForTokens(
  //       amount,
  //       ARR,
  //       //Ethers.provider().getSigner(),
  //       state.sender,
  //       Date.now() + 180,
  //       { value: amount, gasLimit: 3e5 }
  //     )
  //     .then((transactionHash) => {
  //       console.log("transactionHash is " + transactionHash);
  //     });
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
  // State.update({ tokenTo: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2" });
  // State.update({ tokenSelected: 0 });
  const contractGNSTOK = new ethers.Contract(
    gnsToken,
    gnsTokenAbi.body,
    Ethers.provider().getSigner()
  );
  contractGNSTOK.balanceOf(state.sender).then((res) => {
    console.log("balance GNS", Big(res).div(Big(10).pow(18)).toFixed(2));
    State.update({ balance: Big(res).div(Big(10).pow(18)).toFixed(2) });
  });
  // Ethers.provider()
  //   .getBalance(state.sender)
  //   .then((balance) => {
  //     State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
  //   });
}

// FETCH SENDER STETH BALANCE

if (state.stakedBalance === undefined && state.sender) {
  // const contractGNSTOK = new ethers.Contract(
  //   gnsToken,
  //   gnsTokenAbi.body,
  //   Ethers.provider().getSigner()
  // );
  // contractGNSTOK.balanceOf(state.sender).then((res) => {
  //   console.log("balance GNS", Big(res).div(Big(10).pow(18)).toFixed(2));
  //   State.update({ stakedBalance: Big(res).div(Big(10).pow(18)).toFixed(2) });
  // });
  const contractGNSStaking = new ethers.Contract(
    gnsStaking,
    gnsStakingAbi.body,
    Ethers.provider().getSigner()
  );
  contractGNSStaking
    .users(Ethers.provider().getSigner().getAddress())
    .then((res) => {
      console.log(res[0]);
      State.update({
        stakedBalance: Big(res[0]).div(Big(10).pow(18)).toFixed(2),
      });
      //Big(res[0]).div(Big(10).pow(18)).toFixed(2);
    });
}

// FETCH TX COST

/*if (state.txCost === undefined) {
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
} */

// FETCH CSS

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
// const css = fetch(
//   "https://pluminite.mypinata.cloud/ipfs/Qmboz8aoSvVXLeP5pZbRtNKtDD3kX5D9DEnfMn2ZGSJWtP"
// ).body;
const css = `
.LidoContainer{
    box-sizing: border-box;
    margin: 0px auto;
    min-width: 320px;
    width: 100%;
    padding: 0px 32px;
    max-width: 560px;
    position: relative;
    margin-top: 8px;
    margin-bottom: 8px;
}

.Header{
    font-weight: 800;
    font-size: 26px;
    margin-bottom: 0.2em;
    line-height: 1.2em;
    text-align: center;
}

.SubHeader{
    font-weight: 500;
    color: #0df4a3;
    margin-bottom: 16px;
    font-size: 12px;
    line-height: 1.5em;
    text-align: center;
};

.LidoForm{
    background: linear-gradient(65.21deg, rgb(97, 171, 138) 10%, rgb(0, 255, 141) 100%);
    margin-bottom: -20px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    padding-bottom: 52px;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.6em;
    border-radius: 20px;
    margin: 0px;
    padding: 32px;
    box-shadow: none;
    color: #fff;    
}

.LidoFormTopContainer{
    margin-top: 0px;
    display: flex;
    margin: 20px 0px;
}

.LidoFormTopContainerLeft{
    margin-right: 18px;
    flex-basis: 50%;
    -webkit-box-flex: 1;
    flex-grow: 1;
    font-size: 12px;
    line-height: 1.6em;
}

.LidoFormTopContainerLeftContent1{
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    align-items: center;
}

.LidoFormTopContainerLeftContent1Container{
    display: flex;
    -webkit-box-align: center;
    align-items: center;
}

.LidoFormTopContainerLeftContent1Circle{
    background-color: #53BA95;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-left: 8px;
}

.LidoFormTopContainerLeftContent2{
    margin-top: 2px;
    font-size: 18px;
    line-height: 1.4em;
    font-weight: 800;
    white-space: nowrap;
    display: block;
}

.LidoFormTopContainerRight{
    align-self: stretch;
    display: flex;
    flex: 1 1 50%;
    -webkit-box-flex: 1;
    overflow: hidden;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: end;
    justify-content: flex-end;
    margin-left: auto;
}

.LidoFormTopContainerRightContent1{
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0px;
    border-radius: 1000px;
    padding: 4px;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    background: rgba(0, 0, 0, .2);
    color: #fff;    
}

.LidoFormTopContainerRightContent1Text{
    padding: 0px 6px;
    font-weight: 400;
}

.LidoSplitter{
    box-sizing: border-box;
    list-style: none;
    opacity: 0.1;
    padding: 0px;
    flex-shrink: 0;
    -webkit-box-flex: 0;
    flex-grow: 0;
    border-top: 1px solid currentcolor;
    width: 100%;
    height: 0px;
    margin: 0px;
}

.LidoFormBottomContainer{
    margin-bottom: 0px;
    display: flex;
    margin: 20px 0px;
}

.LidoAprContainer{
    margin-right: 0px;
    flex-basis: 50%;
    -webkit-box-flex: 1;
    flex-grow: 1;
    font-size: 12px;
    line-height: 1.6em;
}

.LidoAprTitle{
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    align-items: center;
}

.LidoAprValue{
    margin-top: 2px;
    font-size: 16px;
    line-height: 1.4em;
    font-weight: 800;
    white-space: nowrap;
    color: rgb(97, 183, 95);
    font-size: 16px;
    line-height: 1.4em;
    font-weight: 800;
    white-space: nowrap;
}        
}

.LidoStakeForm{
    font-weight: 400;
    font-size: 12px;
    line-height: 1.6em;
    border-radius: 0px 0px 20px 20px;
    margin: 0px;
    padding: 32px;
    box-shadow: none;
    background: #eee;
    color: #7a8aa0;
    margin-top: -30px;
}

.LidoStakeFormInputContainer{
    margin-bottom: 16px;
    z-index: 2;
    position: relative;
    display: inline-flex;
    border-width: 1px;
    border-style: solid;
    border-image: initial;
    border-radius: 10px;
    -webkit-box-align: stretch;
    align-items: stretch;
    box-sizing: border-box;
    padding: 0px 15px;
    cursor: text;
    transition: border-color 100ms ease 0s;
    width: 100%;
    background: #fff;
    border-color: rgba(0,10,61,.12);
    color: #273852;
}

.LidoStakeFormInputContainerSpan1{
    -webkit-box-flex: 0;
    flex-grow: 0;
    flex-shrink: 0;
    cursor: inherit;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding-right: 16px;
}

.selectCSS{
    font-weight: 400;
    font-size: 14px;
    display: flex;
    border: none;
    -webkit-box-flex: 1;
    flex-grow: 1;
    position: relative;
    padding: 17px 0px;
    color: #273852;
}

.LidoStakeFormInputContainerSpan2{
    font-weight: 400;
    font-size: 14px;
    display: flex;
    -webkit-box-flex: 1;
    flex-grow: 1;
    position: relative;
    padding: 17px 0px;
}

.LidoStakeFormInputContainerSpan2Input{
    width: 100%;
    font-family: inherit;
    font-weight: 400;
    font-size: 1em;
    line-height: 1.43em;
    padding: 0px;
    border-radius: 0px;
    background: transparent;
    box-shadow: none;
    border: none;
    outline: none;
    position: relative;
    top: 0px;
    color: #273852;
}

.LidoStakeFormInputContainerSpan3{
    -webkit-box-flex: 0;
    flex-grow: 0;
    flex-shrink: 0;
    cursor: inherit;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding-left: 16px;
}

.LidoStakeFormInputContainerSpan3Content{
    cursor: pointer;
    letter-spacing: 0.4px;
    box-sizing: border-box;
    margin: 0px;
    border: none;
    outline: none;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    background: transparent;
    font-family: inherit;
    font-weight: 700;
    width: auto;
    line-height: 1em;
    font-size: 10px;
    border-radius: 6px;
    padding: 11px 16px;
    min-width: 50px;
    color: #04dba6;
    &::before {
            display: block;
            background-color: #04dba6;
            transition: opacity 100ms ease 0s;
            opacity: 0.1;
            content: "";
            position: absolute;
            inset: 0px;
            pointer-events: none;
            border-radius: inherit;
        }    
}

.LidoStakeFormInputContainerSpan3Max{
    position: relative;
    pointer-events: none;
    visibility: visible;
}

.LidoStakeFormSubmitContainer{
    cursor: pointer;
    box-sizing: border-box;
    margin: 0px;
    border: none;
    outline: none;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    background-image: initial;
    background-position: initial;
    background-size: initial;
    background-repeat: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    font-family: inherit;
    font-weight: 700;
    width: 100%;
    line-height: 1em;
    font-size: 14px;
    border-radius: 10px;
    padding: 21px 44px;
    min-width: 120px;
    color: #fff;
    background-color: #00bf79;
    transition: background-color 100ms ease 0s;
    &:hover {
        background-color: ##029961;
    }
}

.LidoFooterContainer{
    font-weight: 400;
    font-size: 12px;
    line-height: 1.6em;
}

.LidoFooterRaw{
    margin-top: 0px;
    display: flex;
    margin: 16px 0px;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.6em;
}

.LidoFooterRawLeft{
    color: #7a8aa0;
    -webkit-box-flex: 1;
    flex-grow: 1;
}

.LidoFooterRawRight{
    color: #273852;
    text-align: right;
    margin-left: 32px;
    -webkit-box-flex: 1;
    flex-grow: 1;
}
`;

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
      <div class="Header">Stake GNS</div>
      <div class="SubHeader">Stake GNS token on Polygon </div>

      <div class="LidoForm">
        {state.sender && (
          <>
            <div class="LidoFormTopContainer">
              <div class="LidoFormTopContainerLeft">
                <div class="LidoFormTopContainerLeftContent1">
                  <div class="LidoFormTopContainerLeftContent1Container">
                    <span>Available to stake</span>
                    <div class="LidoFormTopContainerLeftContent1Circle" />
                  </div>
                </div>
                <div class="LidoFormTopContainerLeftContent2">
                  <span>
                    {state.balance ?? (!state.sender ? "0" : "...")}&nbsp;GNS
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
        <div
          class={
            state.sender ? "LidoFormBottomContainer" : "LidoFormTopContainer"
          }
        >
          <div class="LidoFormTopContainerLeft">
            <div class="LidoFormTopContainerLeftContent1">
              <div class="LidoFormTopContainerLeftContent1Container">
                <span>Staked amount</span>
              </div>
            </div>
            <div class="LidoFormTopContainerLeftContent2">
              <span>
                {state.stakedBalance ?? (!state.sender ? "0" : "...")}
                &nbsp;GNS
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="LidoStakeForm">
        <div class="LidoStakeFormInputContainer">
          <span class="LidoStakeFormInputContainerSpan1">
            <img
              src="https://research.binance.com/static/images/projects/gains-network/logo.png"
              width="24"
              height="24"
            />
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
                //strEther: (parseFloat(state.balance) - 0.05).toFixed(2),
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
