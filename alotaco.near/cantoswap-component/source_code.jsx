const fontUrl = `https://ipfs.io/ipfs/bafkreicrs3gh7f77yhpw4xiejx35cd56jcczuhvqbwkn77g2ztkrjejopa`;

const css = `
@font-face {
    font-family: "Pixter";
    src: url("${fontUrl}");
}

img {
  height: 50px;
  margin-bottom: 16px;
}
`;

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Pixter;
    background: black;
    color: white;
    padding: 32px;
    ${css}
`,
  });
}
const Theme = state.theme;

const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender)
  return (
    <div>
      <h2>Connect Your Wallet</h2>
      <p>This app requires you to connect to the Canto Mainnet</p>
    </div>
  );

const PROPS = Object.assign(
  {
    contractName: "cantoswap.fi",
    contractImg:
      "https://www.cantoswap.fi/static/media/cantoswap_logo.07d38228.png",
    contractAddress: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
    abiUrl:
      "https://raw.githubusercontent.com/cloudmex/sushiswap-bos/main/abi-sushi.json",
    tokens: {
      WETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      NEAR: "0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4",
    },
    decimals: {
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": 18,
      "0xdAC17F958D2ee523a2206206994597C13D831ec7": 6,
      "0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4": 24,
    },
  },
  props
);

const MAX_AMOUNT =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

// TODO timeout helper to revert log to empty string
// const resetLog = (dur) => {
//   setTimeout(() => {
//     State.update({
//       log: "",
//     });
//   }, dur);
// };

const formatBig = (big, decimals, sig) => {
  if (!sig) sig = 2;
  const ret = Big(big.toString())
    .div(Big(10).pow(decimals))
    .toFixed(sig)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  if (ret.length > 16) {
    return "MAX AMOUNT";
  }
  return ret;
};

// TODO why undefined?
// const temp = Ethers.send("eth_getBalance", [sender]);
// console.log("temp", temp);
// console.log("sender", sender);
// const cantoBalance = parseInt(Ethers.send("eth_getBalance", [sender]), 16);
// console.log(cantoBalance);

initState({
  log: "",
  explorerLink: "",
  tokenFrom: "",
  showApprove: false,
  allowanceFrom: "0.00",
  tokenTo: "",
  tokenFromBalance: "0.00",
  tokenToBalance: "0.00",
  cantoBalance,
  amount: "1",
});

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!erc20Abi.ok) {
  return "scam";
}

const swapRouterAbi = fetch(PROPS.abiUrl);

const ifaceToken = new ethers.utils.Interface(erc20Abi.body);
const ifaceSwap = new ethers.utils.Interface(swapRouterAbi.body);

const tokens = {
  "Select Token": "",
  ...PROPS.tokens,
};

const decimals = PROPS.decimals;

const tokensMenuItems = Object.keys(tokens).map((token) => (
  <option key={token} value={tokens[token]}>
    {token}
  </option>
));

const handleTxError = (e) => {
  if (e.reason === "user rejected transaction") {
    State.update({
      log: "You rejected the TX",
    });
  } else if (/unknown request|transferFrom failed/gi.test(JSON.stringify(e))) {
    State.update({
      log: "Token not approved!",
    });
  } else {
    State.update({
      log: "There was an error: " + JSON.stringify(e),
    });
  }
};

const setToken = (token, key) => {
  State.update({ [key]: token });
  getTokenBalance(sender, token).then((value) => {
    State.update({
      [key + "Balance"]: value,
    });
  });
  if (/from/gi.test(key)) {
    handleUpdateAmount();
  }
};

const getTokenBalance = (receiver, token) => {
  const encodedData = ifaceToken.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: token,
      data: encodedData,
    })
    .then((rawBalance) => {
      const balanceHex = ifaceToken.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );
      return formatBig(balanceHex, decimals[token]);
    });
};

const handleUpdateAmount = () => {
  const encodedData = ifaceToken.encodeFunctionData("allowance", [
    sender,
    PROPS.contractAddress,
  ]);

  console.log(PROPS.contractAddress, state.tokenFrom);

  return Ethers.provider()
    .call({
      to: state.tokenFrom,
      data: encodedData,
    })
    .then((rawBalance) => {
      const balanceHex = ifaceToken.decodeFunctionResult(
        "allowance",
        rawBalance
      );
      const allowanceFrom = formatBig(balanceHex, decimals[state.tokenFrom]);
      State.update({
        allowanceFrom,
        showApprove: allowanceFrom === "0.00",
      });
    });
};

// Transactions

const handleApprove = () => {
  const contract = new ethers.Contract(
    state.tokenFrom,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  contract
    .approve(PROPS.contractAddress, MAX_AMOUNT)
    .then((tx) => {
      State.update({
        log: "The TX hash is: " + tx.hash,
        explorerLink: "https://tuber.build/tx/" + tx.hash,
      });
    })
    .catch(handleTxError);
};

const swapTokens = () => {
  const contract = new ethers.Contract(
    PROPS.contractAddress,
    swapRouterAbi.body,
    Ethers.provider().getSigner()
  );

  let amountIn = ethers.utils.parseUnits(
    state.amount,
    decimals[state.tokenFrom]
  );
  const amountOutString = (parseFloat(state.amount) - 0.05).toString();
  let amountOut = ethers.utils.parseUnits(
    amountOutString,
    decimals[state.tokenTo]
  );

  const tokenFromBig = ethers.utils.parseUnits(
    state.tokenFromBalance,
    decimals[state.tokenFrom]
  );

  if (amountIn.gt(tokenFromBig)) {
    State.update({
      log: `You don't have enough!`,
    });
    resetLog(2000);
    return;
  }

  console.log(
    amountIn,
    amountOut,
    [state.tokenFrom, state.tokenTo],
    sender,
    Date.now() + 60 * 1000
  );

  let routes = [state.tokenFrom, state.tokenTo];
  if (PROPS.contractAddress === "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F") {
    routes = [
      {
        from: state.tokenFrom,
        to: state.tokenTo,
        stable: true,
      },
    ];
  }

  contract
    .swapExactTokensForTokens(
      amountIn,
      amountOut,
      [state.tokenFrom, state.tokenTo],
      sender,
      Date.now() + 60 * 1000
    )
    .then((tx) => {
      State.update({
        log: "The TX hash is: " + tx.hash,
        explorerLink: "https://tuber.build/tx/" + tx.hash,
      });
    })
    .catch(handleTxError);
};

return (
  <Theme>
    <img src={PROPS.contractImg} />
    <p>
      {PROPS.contractName} -
      <a
        href={`https://tuber.build/address/${PROPS.contractAddress}`}
        target="_blank"
      >
        Explorer Link
      </a>
    </p>
    <p>Account: {sender}</p>
    {state.log.length > 1 && <p>Log: {state.log}</p>}
    {state.explorerLink.length > 1 && (
      <a href={state.explorerLink} target="_blank">
        View Most Recent TX
      </a>
    )}
    <div class="mb-3">
      <label for="selectToken">From</label>
      <select
        class="form-select"
        id="selectToken"
        onChange={(e) => {
          setToken(e.target.value, "tokenFrom");
        }}
      >
        {tokensMenuItems}
      </select>
      <p>Balance: {state.tokenFromBalance}</p>
      <p>Allowance: {state.allowanceFrom}</p>
      {state.showApprove && (
        <button class="btn btn-success" onClick={handleApprove}>
          Approve
        </button>
      )}
    </div>

    <div class="mb-3">
      <label for="selectToken">To {state.tokenToBalance}</label>
      <select
        class="form-select"
        id="selectToken"
        onChange={(e) => {
          setToken(e.target.value, "tokenTo");
        }}
      >
        {tokensMenuItems}
      </select>
    </div>

    <div class="mb-3">
      <label for="amount" class="form-label">
        Enter the amount
      </label>
      <input
        value={state.amount}
        class="form-control"
        id="amount"
        placeholder="1"
        onChange={(e) => {
          handleUpdateAmount(e.target.value);
          State.update({ amount: e.target.value });
        }}
      />
    </div>

    <div class="mb-3">
      <button onClick={swapTokens} class="btn btn-success">
        Swap
      </button>
    </div>
  </Theme>
);
