// FETCH ABI

const gainsStakingContract = "0x6B8D3C08072a020aC065c467ce922e3A36D3F9d6";
const gainsTokenContract = "0x18c11FD286C5EC11c3b683Caa813B77f5163A122";
const tokenDecimals = 18;

const stakingAbi = fetch(
  "https://gist.githubusercontent.com/Prometheo/9c658aa282c90dd1b3ae873d541ea2a4/raw/e3c3abc49a2b373e737930b1f3281c049d7fe1e8/stakingAbi.json"
);

const tokenAbi = fetch(
  "https://gist.githubusercontent.com/Prometheo/44ed199abaa7eced6c189e3e6aa8b310/raw/01d057967bcff8f00cc14dc7b2f9a9fd56bc65c7/abi.json"
);
if (!tokenAbi.ok) {
  return "Loading";
}
let apr = 0;
const arbitrumApr = fetch("https://backend-arbitrum.gains.trade/apr");

// if (tokenAbi.ok) {
//   return "Loading";
// }

if (arbitrumApr.ok) {
  apr = arbitrumApr.body.sssBaseApr.toFixed(2);
}

const iface = new ethers.utils.Interface(stakingAbi.body);
const tokenIFace = new ethers.utils.Interface(tokenAbi.body);

// HELPER FUNCTION

const getStakedBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData("users", [receiver]);

  return Ethers.provider()
    .call({
      to: gainsStakingContract,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "users",
        rawBalance
      );

      State.update({ rawStaked: receiverBalanceHex.stakedTokens.toString() });
      State.update({
        rawBoost: receiverBalanceHex.totalBoostTokens.toString(),
      });
      State.update({ rawDebtDai: receiverBalanceHex.debtDai.toString() });
      console.log(receiverBalanceHex);
      return Big(receiverBalanceHex.stakedTokens.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

const getRewardBalance = () => {
  const encodedData = iface.encodeFunctionData("accDaiPerToken");
  return Ethers.provider()
    .call({
      to: gainsStakingContract,
      data: encodedData,
    })
    .then((accDaiPerToken) => {
      const DaiPerToken = iface.decodeFunctionResult(
        "accDaiPerToken",
        accDaiPerToken
      );

      // calculate pending reward
      const DaiReward =
        ((parseFloat(state.rawStaked) + parseFloat(state.rawBoost)) *
          parseFloat(DaiPerToken.toString())) /
          1e18 -
        state.rawDebtDai;

      console.log("last shi", DaiReward);

      return Big(DaiReward.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(10)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

const getTokenBalance = (receiver) => {
  const encodedData = tokenIFace.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: gainsTokenContract,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = tokenIFace.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      console.log(receiverBalanceHex.toString());

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

const getTokenAllowance = (receiver) => {
  const encodedData = tokenIFace.encodeFunctionData("allowance", [
    receiver,
    gainsStakingContract,
  ]);

  return Ethers.provider()
    .call({
      to: gainsTokenContract,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = tokenIFace.decodeFunctionResult(
        "allowance",
        rawBalance
      )[0];

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2);
    });
};

const stakeTokens = (tokenAmount) => {
  if (!tokenAmount || tokenAmount > state.balance) {
    return console.log("Amount is missing");
  }
  const erc20 = new ethers.Contract(
    gainsStakingContract,
    stakingAbi.body,
    Ethers.provider().getSigner()
  );

  let amount = ethers.utils.parseEther(state.tokenAmount);

  erc20
    .stakeTokens(amount)
    .then((transactionHash) => transactionHash.wait())
    .then((ricit) => {
      getTokenBalance(state.sender).then((balance) => {
        State.update({ balance });
      });
      getStakedBalance(state.sender).then((stakedBalance) => {
        State.update({ stakedBalance });
      });
      State.update({ tokenAmount: 0 });
    });
};

const unStakeTokens = (tokenAmount) => {
  if (parseFloat(state.stakedBalance) == 0) {
    return console.log("Amount is missing");
  }
  const erc20 = new ethers.Contract(
    gainsStakingContract,
    stakingAbi.body,
    Ethers.provider().getSigner()
  );

  const amount = ethers.utils.parseEther(state.stakedBalance);

  erc20
    .unstakeTokens(amount)
    .then((transactionHash) => transactionHash.wait())
    .then((ricit) => {
      getTokenBalance(state.sender).then((balance) => {
        State.update({ balance });
      });
      getStakedBalance(state.sender).then((stakedBalance) => {
        State.update({ stakedBalance });
      });
    });
};

const withdrawReward = () => {
  if (!(state.rewards > 0) && state.sender) {
    console.log("criterias not met");
    return;
  }
  const erc20 = new ethers.Contract(
    gainsStakingContract,
    stakingAbi.body,
    Ethers.provider().getSigner()
  );

  erc20
    .harvest()
    .then((transactionHash) => transactionHash.wait())
    .then((ricit) => {
      console.log("receipt", ricit);
      getStakedBalance(state.sender).then((stakedBalance) => {
        State.update({ stakedBalance });
      });
      getRewardBalance().then((rewards) => {
        State.update({ rewards });
      });
    });
};

const updator = (tokenAmount) => {
  console.log("updator", tokenAmount);
  State.update({ tokenAmount: tokenAmount });
};

const approveToken = () => {
  const erc20 = new ethers.Contract(
    gainsTokenContract,
    tokenAbi.body,
    Ethers.provider().getSigner()
  );

  const maxAllowance =
    "115792089237316195423570985008687907853269984665640564039457584007913129639935";

  erc20
    .approve(gainsStakingContract, maxAllowance)
    .then((transactionHash) => transactionHash.wait())
    .then((ricit) => {
      console.log("receipt", ricit);
      State.update({
        allowance: Big(maxAllowance).div(Big(10).pow(tokenDecimals)).toFixed(2),
      });
    });
};

const getTotalRewardDistributed = () => {
  const encodedData = iface.encodeFunctionData("totalRewardsDistributedDai");
  return Ethers.provider()
    .call({
      to: gainsStakingContract,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "totalRewardsDistributedDai",
        rawBalance
      );
      console.log("dhee", receiverBalanceHex.toString());

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

// DETECT User

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    console.log("set sender", accounts[0]);
  }
}

//if (!state.sender)  return "Please login first";
// FETCH Gains Network Total rewards distributed

if (!state.totalRewards && state.sender) {
  getTotalRewardDistributed().then((totalRewards) => {
    State.update({ totalRewards });
  });
}

if (state.balance === undefined && state.sender) {
  // FETCH SENDER BALANCE
  getTokenBalance(state.sender).then((balance) => {
    State.update({ balance });
  });
}

// FETCH SENDER STETH BALANCE

if (state.stakedBalance === undefined && state.sender) {
  getStakedBalance(state.sender).then((stakedBalance) => {
    State.update({ stakedBalance });
  });
}

if (state.sender && state.allowance == undefined) {
  getTokenAllowance(state.sender).then((allowance) => {
    console.log("Allowance rawed", allowance);
    State.update({ allowance });
  });
}

if (state.sender && state.rewards == undefined) {
  console.log("does it try?");
  getRewardBalance().then((rewards) => {
    State.update({ rewards });
  });
}

// FETCH CSS

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://pluminite.mypinata.cloud/ipfs/Qmboz8aoSvVXLeP5pZbRtNKtDD3kX5D9DEnfMn2ZGSJWtP"
).body;

if (!cssFont || !css) return "";

// CUSTOM CSS

const cds = `.LidoWithdrawFormSubmitContainer{
    color: #7a8aa0;
    -webkit-box-flex: 1;
    flex-grow: 1;
}
.LidoForm{
    background: linear-gradient(65.21deg, rgb(0 0 0) 19.1%, rgb(70, 131, 154) 100%);
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
.LidoFormTopContainerLeftContent1Circle{
    background-color: rgb(5 240 34);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-left: 8px;
}
`;

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}
    ${cds}
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
  <Widget
    src="0xprometheus.near/widget/StakeW"
    props={{
      state,
      getSender,
      unstakeTokens,
      stakeTokens,
      withdrawReward,
      apr,
      approveToken,
      updator,
    }}
  />
);
