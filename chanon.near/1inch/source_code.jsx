// เหลือ State.update({ txHash: "https://bscscan.com/tx/" + tx.hash }); หลัง Swap
// เหลือ ปุ่ม Max
// เหลือ ใส่ Amount
// เหลือ Swap ไม่ได้ถ้าไม่ใส่ เหรียญปลายทาง หรือ เหรียญ ต้นทางกับ ปลายทางเหมือนกัน

initState({
  toggleAmount: false,
  txHash: "",
  tokenDecimals: 18,
});

const signer = Ethers.send("eth_requestAccounts", [])[0];

if (!signer) {
  return (
    <div>
      <h3>Please connect your wallet</h3>
      <Web3Connect />
    </div>
  );
}

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

if (state.chainId !== 56) {
  return (
    <div>
      <h3>
        Wrong Network - We only support the Binance Smart Chain mainnet at this
        time.
      </h3>
    </div>
  );
}

const setToken = (token) => {
  State.update({ token });
  checkAllowance(token);
};

const setDestinationToken = (destinationToken) => {
  State.update({ destinationToken });
};

function checkAllowance(token) {
  asyncFetch(
    "https://api.1inch.io/v5.0/" +
      state.chainId +
      "/approve/allowance?tokenAddress=" +
      token +
      "&walletAddress=" +
      signer
  ).then((res) => {
    console.log(res);
    if (res.status === 200) {
      {
        res.body.allowance > 0
          ? State.update({ toggleAmount: true })
          : State.update({ toggleAmount: false });
      }
    } // TODO :: need to handle error ?
  });
}

const tokens = {
  "Select Token": "",
  USDT: "0x55d398326f99059fF775485246999027B3197955",
  BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
};

const tokensMenuItems = Object.keys(tokens).map((token) => (
  <option value={tokens[token]}>{token}</option>
));

const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
const USDT = "0x55d398326f99059fF775485246999027B3197955";
const ROUTER = "0x1111111254eeb25477b68fb85ed929f73a960582";

const MAX_AMOUNT =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

const MIN_AMOUNT =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!erc20Abi.ok) {
  return "busd not ok";
}

const oneInchAbi = fetch(
  "https://gist.githubusercontent.com/taforyou/5747abd24159d5fd4e95cf1820d5d90f/raw/ca965bdfa9a291d2e0e8617f9f6b53d132baa0c6/1inchv5.abi.json"
);
if (!oneInchAbi.ok) {
  return "1inch not ok";
}

const apiBaseUrl = "https://api.1inch.io/v5.0/" + state.chainId;

function apiRequestUrl(methodName, queryParams) {
  return apiBaseUrl + methodName + "?" + buildSearchParams(queryParams);
}

function buildSearchParams(params) {
  var ss = [];
  for (const [key, value] of Object.entries(params)) {
    ss.push(`${key}=${value}`);
  }
  return ss.join("&");
}

const handleApprove = () => {
  const approveToken = new ethers.Contract(
    state.token,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  approveToken.approve(ROUTER, MAX_AMOUNT).then((tx) => {
    State.update({ txHash: "https://bscscan.com/tx/" + tx.hash });
    // console.log({
    //   log: "The TX hash is: " + tx.hash,
    //   explorerLink: "https://bscscan.com/tx/" + tx.hash,
    // });
  });
};

const handleSwap = () => {
  console.log("fromTokenAddress ", state.token);
  console.log("destinationToken ", state.destinationToken);
  const swapParam = {
    fromTokenAddress: state.token,
    toTokenAddress: state.destinationToken,
    amount: "1000000000000000000", // 1 * 10^18 wei
    fromAddress: signer,
    slippage: 1,
  };
  asyncFetch(apiRequestUrl("/swap", swapParam)).then(({ ok, body }) => {
    if (!ok) {
      return;
    }

    const ifaceOneInch = new ethers.utils.Interface(oneInchAbi.body);
    const r = ifaceOneInch.decodeFunctionData("swap", body.tx.data);
    const oneInch = new ethers.Contract(
      ROUTER,
      oneInchAbi.body,
      Ethers.provider().getSigner()
    );

    // Function: swap(address executor,tuple desc,bytes permit,bytes data)
    oneInch.swap(r.executor, r.desc, r.permit, r.data).then((x) => {
      console.log(x);
    });
  });
};

return (
  <div>
    <h3>Swap BEP-20 tokens via 1inch V.5</h3>
    <div class="mb-3">
      <label for="selectToken">From token</label>
      <select
        class="form-select"
        id="selectToken"
        onChange={(e) => {
          setToken(e.target.value);
        }}
      >
        {tokensMenuItems}
      </select>
    </div>

    {state.toggleAmount ? (
      <input
        value={state.fromTokenAmount}
        onChange={(e) => State.update({ fromTokenAmount: e.target.value })}
        placeholder="Amount"
      />
    ) : (
      <button
        class="btn btn-success"
        onClick={handleApprove}
        disabled={state.token ? false : true}
      >
        Please allow the use of a 1-inch router for the swap.
      </button>
    )}
    <div class="mb-3">
      <label for="selectToken">To token</label>
      <select
        class="form-select"
        id="selectToken"
        onChange={(e) => {
          setDestinationToken(e.target.value);
        }}
      >
        {tokensMenuItems}
      </select>
    </div>
    <button class="btn btn-success" onClick={handleSwap} disabled={false}>
      Swap
    </button>
    <div>tx explorer : {state.txHash}</div>
  </div>
);
