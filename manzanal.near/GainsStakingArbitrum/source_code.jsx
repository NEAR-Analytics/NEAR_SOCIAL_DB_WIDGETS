const gainsStakingContract = "0x6B8D3C08072a020aC065c467ce922e3A36D3F9d6";
const gainsTokenContract = "0x18c11FD286C5EC11c3b683Caa813B77f5163A122";
const tokenDecimals = 18;
const fetchAbiRaw = (contract) => {
  return fetch(
    `https://raw.githubusercontent.com/leomanza/ETHDubaiHackathon/main/abis/gains/${contract}`
  );
};
let stakingAbi = fetchAbiRaw(gainsStakingContract);
let tokenAbi = fetchAbiRaw(gainsTokenContract);
const arbitrumApr = fetch("https://backend-arbitrum.gains.trade/apr", {
  subscribe: true,
});

if (!stakingAbi.ok && !tokenAbi.ok && !arbitrumApr) {
  return "Loading";
}
stakingAbi = JSON.parse(stakingAbi.body);
tokenAbi = JSON.parse(tokenAbi.body);
const iface = new ethers.utils.Interface(stakingAbi);
const tokenIFace = new ethers.utils.Interface(tokenAbi);

State.init({
  apr: arbitrumApr.body.sssBaseApr.toFixed(2),
});
const formatBigNumber = (big) => {
  return Big(big)
    .div(Big(10).pow(tokenDecimals))
    .toFixed(4)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
const getStakedBalance = (receiver) => {
  return Ethers.provider()
    .call({
      to: gainsStakingContract,
      data: iface.encodeFunctionData("users", [receiver]),
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
      return formatBigNumber(receiverBalanceHex.stakedTokens.toString());
    });
};
const getRewardBalance = () => {
  return Ethers.provider()
    .call({
      to: gainsStakingContract,
      data: iface.encodeFunctionData("accDaiPerToken"),
    })
    .then((accDaiPerToken) => {
      const DaiPerToken = iface.decodeFunctionResult(
        "accDaiPerToken",
        accDaiPerToken
      );
      const daiReward =
        ((parseFloat(state.rawStaked) + parseFloat(state.rawBoost)) *
          parseFloat(DaiPerToken.toString())) /
          1e18 -
        state.rawDebtDai;

      return formatBigNumber(daiReward.toString());
    });
};
const getTokenBalance = (receiver) => {
  return Ethers.provider()
    .call({
      to: gainsTokenContract,
      data: tokenIFace.encodeFunctionData("balanceOf", [receiver]),
    })
    .then((rawBalance) => {
      const receiverBalanceHex = tokenIFace.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );
      return formatBigNumber(receiverBalanceHex.toString());
    });
};
const getTokenAllowance = (receiver) => {
  return Ethers.provider()
    .call({
      to: gainsTokenContract,
      data: tokenIFace.encodeFunctionData("allowance", [
        receiver,
        gainsStakingContract,
      ]),
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
    return;
  }
  const erc20 = new ethers.Contract(
    gainsStakingContract,
    stakingAbi,
    Ethers.provider().getSigner()
  );
  erc20
    .stakeTokens(ethers.utils.parseEther(state.tokenAmount))
    .then((transactionHash) => transactionHash.wait())
    .then((receipt) => {
      getTokenBalance(state.sender).then((balance) => {
        State.update({ balance });
      });
      getStakedBalance(state.sender).then((stakedBalance) => {
        State.update({ stakedBalance });
      });
      getRewardBalance().then((rewards) => {
        State.update({ rewards });
      });
      State.update({ tokenAmount: 0 });
    });
};
const unStakeTokens = () => {
  if (parseFloat(state.stakedBalance) == 0) {
    return;
  }
  const erc20 = new ethers.Contract(
    gainsStakingContract,
    stakingAbi,
    Ethers.provider().getSigner()
  );
  erc20
    .unstakeTokens(ethers.utils.parseEther(state.stakedBalance))
    .then((transactionHash) => transactionHash.wait())
    .then((receipt) => {
      getTokenBalance(state.sender).then((balance) => {
        State.update({ balance });
      });
      getStakedBalance(state.sender).then((stakedBalance) => {
        State.update({ stakedBalance });
      });
      getRewardBalance().then((rewards) => {
        State.update({ rewards });
      });
    });
};
const harverstRewards = () => {
  if (!(state.rewards > 0) && state.sender) {
    return;
  }
  const erc20 = new ethers.Contract(
    gainsStakingContract,
    stakingAbi,
    Ethers.provider().getSigner()
  );
  erc20
    .harvest()
    .then((transactionHash) => transactionHash.wait())
    .then((response) => {
      State.update({ rewards: 0 });
    });
};
const updateTokenAmount = (tokenAmount) => {
  State.update({ tokenAmount: tokenAmount });
};
const approveToken = () => {
  const erc20 = new ethers.Contract(
    gainsTokenContract,
    tokenAbi,
    Ethers.provider().getSigner()
  );
  const maxAllowance =
    "115792089237316195423570985008687907853269984665640564039457584007913129639935";
  erc20
    .approve(gainsStakingContract, maxAllowance)
    .then((transactionHash) => transactionHash.wait())
    .then((receipt) => {
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
      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(4)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};
if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}
if (state.sender && !state.totalRewards) {
  getTotalRewardDistributed().then((totalRewards) => {
    State.update({ totalRewards });
  });
}
if (state.sender && state.balance === undefined) {
  getTokenBalance(state.sender).then((balance) => {
    State.update({ balance });
  });
}
if (state.sender && state.stakedBalance === undefined) {
  getStakedBalance(state.sender).then((stakedBalance) => {
    State.update({ stakedBalance });
  });
}
if (state.sender && state.allowance == undefined) {
  getTokenAllowance(state.sender).then((allowance) => {
    State.update({ allowance });
  });
}
if (state.sender && state.rewards == undefined) {
  getRewardBalance().then((rewards) => {
    State.update({ rewards });
  });
}
const renderContent = () => {
  return (
    <>
      <Widget
        src="manzanal.near/widget/GainStakingArbitrum.Info"
        props={{ state, unStakeTokens, harverstRewards }}
      />
      <Widget
        src="manzanal.near/widget/GainStakingArbitrum.StakeForm"
        props={{ state, updateTokenAmount, approveToken, stakeTokens }}
      />
    </>
  );
};
return (
  <Widget
    src="manzanal.near/widget/StakingTheme"
    props={{ children: renderContent() }}
  />
);
