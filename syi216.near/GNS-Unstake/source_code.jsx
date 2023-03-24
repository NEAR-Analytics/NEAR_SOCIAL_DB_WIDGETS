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

  const contractGNSStaking = new ethers.Contract(
    gnsStaking,
    gnsStakingAbi.body,
    Ethers.provider().getSigner()
  );
  let amount = ethers.utils.parseUnits(strEther, tokenDecimals).toHexString();

  contractGNSStaking
    .unstakeTokens(amount, { gasLimit: 3e6 })
    .then((transactionHash) => {
      console.log("transactionHash is " + transactionHash);
    });
};

const claimRewards = (strEther, _referral) => {
  const contractGNSStaking = new ethers.Contract(
    gnsStaking,
    gnsStakingAbi.body,
    Ethers.provider().getSigner()
  );

  console.log("contract", contractGNSStaking);
  contractGNSStaking.harvest().then((transactionHash) => {
    console.log("transactionHash is " + transactionHash);
  });
};

const approveGNS = (strEther, _referral) => {
  const contractGNSStaking = new ethers.Contract(
    gnsStaking,
    gnsStakingAbi.body,
    Ethers.provider().getSigner()
  );
  console.log("balance unfixed: ", state.balanceUnfixed);
  contractGNSTOK
    .approve(gnsStaking, state.balanceUnfixed, {
      value: state.balanceUnfixed,
      gasLimit: 3e4,
    })
    .then((th) => {
      console.log("transaction Hash: ", th);
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

// FETCH SENDER BALANCE

if (state.balance === undefined && state.sender) {
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
        balance: Big(res[0]).div(Big(10).pow(18)).toFixed(2),
      });
    });
  contractGNSStaking
    .pendingRewardDai(Ethers.provider().getSigner().getAddress())
    .then((res) => {
      console.log("Reward Dai: ", res);
      State.update({
        daiBalance: Big(res).div(Big(10).pow(18)).toFixed(10),
      });
    });
}

// FETCH CSS

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://nativonft.mypinata.cloud/ipfs/Qmdpe64Mm46fvWNVaCroSGa2JKgauUUUE5251Cx9nTKNrs"
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
      <div class="Header">Manage stake GNS</div>
      <div class="SubHeader">Manage stake GNS token on Polygon </div>
      <div class="LidoForm">
        {state.sender && (
          <>
            <div class="LidoFormTopContainer">
              <div class="LidoFormTopContainerLeft">
                <div class="LidoFormTopContainerLeftContent1">
                  <div class="LidoFormTopContainerLeftContent1Container">
                    <span>Available to unstake</span>
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
                <span>Available rewards to claim</span>
              </div>
            </div>
            <div class="LidoFormTopContainerLeftContent2">
              <span>
                {state.daiBalance ?? (!state.sender ? "0" : "...")}
                &nbsp;DAI
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="LidoStakeForm">
        {!!state.sender ? (
          <div>
            <button
              class="LidoStakeFormSubmitContainer mb-4"
              onClick={() => claimRewards()}
            >
              <span>Claim rewards</span>
            </button>
          </div>
        ) : (
          ""
        )}

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
          <div>
            <button
              class="LidoStakeFormSubmitContainer"
              onClick={() => submitEthers(state.strEther, state.sender)}
            >
              <span>Unstake</span>
            </button>
          </div>
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
