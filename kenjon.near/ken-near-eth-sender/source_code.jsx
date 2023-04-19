const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!erc20Abi.ok) {
  return "scam";
}

const iface = new ethers.utils.Interface(erc20Abi.body);

initState({
  token: "",
  tokenDecimals: "",
  sendTo: "",
  sender,
  senderBalance: "0",
  receiverBalance: "0",
  receiver: "",
  amount: "1",
});

const tokens = {
  "Select Token": "",
  USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
  USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  MKR: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
};

const tokensMenuItems = Object.keys(tokens).map((token) => (
  <option value={tokens[token]}>{token}</option>
));

const setSendTo = (sendTo) => {
  const receiver = Ethers.resolveName(sendTo);
  State.update({ sendTo, receiver: receiver ?? "" });
  refreshBalances();
};

const setToken = (token) => {
  State.update({ token });
  getTokenDecimals();
};

const getTokenBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: state.token,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(state.tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

const getTokenDecimals = () => {
  const encodedData = iface.encodeFunctionData("decimals", []);

  return Ethers.provider()
    .call({
      to: state.token,
      data: encodedData,
    })
    .then((tokenDecimals) => {
      State.update({ tokenDecimals: parseInt(Number(tokenDecimals)) });
      refreshBalances();
    });
};

const refreshBalances = () => {
  getTokenBalance(state.sender).then((value) => {
    State.update({ senderBalance: value });
  });

  getTokenBalance(state.receiver).then((value) => {
    State.update({ receiverBalance: value });
  });
};

const sendTokens = () => {
  const erc20 = new ethers.Contract(
    state.token,
    erc20Abi.body,
    Ethers.provider().getSigner()
  );

  let amount = ethers.utils.parseUnits(state.amount, state.tokenDecimals);

  erc20.transfer(state.receiver, amount);

  console.log("transactionHash is " + transactionHash);
};

/// NEAR STUFF

const accountId = context.accountId;

const shrinkToken = (value, decimals) => {
  return new Big(value || 0).div(new Big(10).pow(decimals || 24));
};

const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};

const account = fetch("https://rpc.mainnet.near.org", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "dontcare",
    method: "query",
    params: {
      request_type: "view_account",
      finality: "final",
      account_id: accountId,
    },
  }),
});

const getBalance = (token_id, tokenMeta) => {
  let amount;

  if (!accountId) {
    return "0";
  }

  if (token_id === "NEAR") amount = account.body.result.amount;
  else {
    amount = Near.view(token_id, "ft_balance_of", {
      account_id: accountId,
    });
  }

  return !amount ? "0" : shrinkToken(amount, tokenMeta.decimals).toFixed();
};

const REF_TOKEN_META = {
  decimals: 18,
  icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='16 24 248 248' style='background: %23000'%3E%3Cpath d='M164,164v52h52Zm-45-45,20.4,20.4,20.6-20.6V81H119Zm0,18.39V216h41V137.19l-20.6,20.6ZM166.5,81H164v33.81l26.16-26.17A40.29,40.29,0,0,0,166.5,81ZM72,153.19V216h43V133.4l-11.6-11.61Zm0-18.38,31.4-31.4L115,115V81H72ZM207,121.5h0a40.29,40.29,0,0,0-7.64-23.66L164,133.19V162h2.5A40.5,40.5,0,0,0,207,121.5Z' fill='%23fff'/%3E%3Cpath d='M189 72l27 27V72h-27z' fill='%2300c08b'/%3E%3C/svg%3E%0A",
  id: "token.v2.ref-finance.near",
  name: "Ref Finance Token",
  symbol: "REF",
};

const NEAR_META = {
  decimals: 24,
  icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTcuNSIgZmlsbD0id2hpdGUiIHN0cm9rZT0iYmxhY2siLz4KPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTcuNSIgZmlsbD0id2hpdGUiIHN0cm9rZT0iYmxhY2siLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC42MDc4IDEyLjUwMjlWMjMuNjE5M0wxNi4yOTIgMTkuMzcyMUwxNi44NjA0IDE5Ljg3MDZMMTIuMDkzOCAyNi41ODQ0QzEwLjMyMjggMjguMjA5MiA3LjE5NzI3IDI3LjEwOTkgNy4xOTcyNyAyNC44NjIyVjExLjEzNzFDNy4xOTcyNyA4LjgxMjI4IDEwLjUwNTggNy43NTMzNCAxMi4yMTMzIDkuNTMxNkwyNS4zODY3IDIzLjI1MDRWMTIuNTkwMkwyMC4yNzEgMTYuMzgxMkwxOS43MDI1IDE1Ljg4MjdMMjMuNzU2NyA5LjYxNTZDMjUuNDQ4OSA3LjgwNDQyIDI4Ljc5NzMgOC44NTM3NiAyOC43OTczIDExLjE5NTNWMjQuNjE2M0MyOC43OTczIDI2Ljk0MTEgMjUuNDg4OCAyOCAyMy43ODEyIDI2LjIyMThMMTAuNjA3OCAxMi41MDI5WiIgZmlsbD0iIzBGMUQyNyIvPgo8L3N2Zz4K",
  id: "NEAR",
  name: "NEAR",
  symbol: "NEAR",
};

const ExchangeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    style={{
      cursor: "pointer",
    }}
    onClick={() => {
      State.update({
        tokenIn: state.tokenOut,
        tokenOut: state.tokenIn,
      });
    }}
  >
    <path
      opacity="0.5"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.25977 12.9751C8.25977 13.5274 8.70748 13.9751 9.25977 13.9751C9.81205 13.9751 10.2598 13.5274 10.2598 12.9751L10.2598 3.3924L12.2975 5.40399C12.6905 5.79199 13.3237 5.7879 13.7117 5.39487C14.0997 5.00183 14.0956 4.36868 13.7025 3.98068L9.9623 0.288376C9.6753 0.00505281 9.2462 -0.0781458 8.87411 0.077387C8.50202 0.232919 8.25977 0.596739 8.25977 1.00003L8.25977 12.9751ZM5.27273 1.02496C5.27273 0.472672 4.82501 0.0249573 4.27273 0.0249573C3.72044 0.0249573 3.27273 0.472672 3.27273 1.02496V10.6077L1.70253 9.0576C1.30949 8.6696 0.676343 8.67369 0.288346 9.06672C-0.0996505 9.45976 -0.0955657 10.0929 0.29747 10.4809L3.5702 13.7117C3.8572 13.995 4.2863 14.0782 4.65839 13.9227C5.03048 13.7671 5.27273 13.4033 5.27273 13V1.02496Z"
      fill="#91A2AE"
    />
  </svg>
);

const ExchangeWrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  margin-bottom: 16px;
  
`;

const Exchange = <ExchangeWrapper>{ExchangeIcon}</ExchangeWrapper>;

State.init({
  tokenIn: NEAR_META,
  tokenOut: REF_TOKEN_META,
  amountIn: "1",
  amountOut: "",
  showSetting: false,
  slippagetolerance: "0.5",
  estimate: {},
  timerIntervalSet: false,
  reloadPools: false,
  loadRes: (value) =>
    State.update({
      estimate: value,
      amountOut: value === null ? "" : value.estimate,
    }),
});

if (!Storage.get("count")) {
  Storage.set("count", 21);
}

let timerInterval;

if (!state.timerIntervalSet) {
  State.update({
    timerIntervalSet: true,
  });
  timerInterval = setTimeout(() => {
    const count = Storage.get("count");

    if (count === 1) {
      State.update({
        reloadPools: true,
      });
    }
    Storage.set("count", count === 1 ? 21 : count - 1);

    State.update({
      timerIntervalSet: false,
    });

    clearTimeout(timerInterval);
  }, 1000);
}

const Container = styled.div`
    width: 430px;
    color: white;
`;

const Refresh = styled.span`
  margin-left:8px;
  font-size:12px
`;

const RefreshText = styled.span`
  margin-left:4px;
  font-size: 12px;
  color: #7E8A93;
`;

const RateLine = styled.div`
  display: flex;
  align-items:center;
  justify-content: space-between;
`;

const RefreshWrapper = styled.div`
  display: flex;
  align-items:center;
  cursor: pointer
`;

const RateWrapper = styled.div`
  display: flex;
  align-items:center;
  font-size: 12px;
  color: #7E8A93
`;

const notEnough = new Big(state.amountIn || 0).gt(
  getBalance(state.tokenIn.id, state.tokenIn)
);

const canSwap =
  Number(state.amountIn || 0) > 0 &&
  Number(state.amountOut || 0) > 0 &&
  !state.loading;

const register = Near.view(
  state.tokenOut.id === "NEAR" ? "wrap.near" : state.tokenOut.id,
  "storage_balance_of",
  {
    account_id: accountId,
  }
);

const callTx = () => {
  const tx = [];

  const nearDeposit = {
    contractName: "wrap.near",
    methodName: "near_deposit",
    deposit: expandToken(state.amountIn, 24).toFixed(),
    gas: expandToken(50, 12),
  };
  const nearWithdraw = {
    contractName: "wrap.near",
    methodName: "near_withdraw",
    deposit: new Big("1").toFixed(),
    args: {
      amount: expandToken(state.amountIn, 24).toFixed(),
    },
  };

  if (state.estimate.pool === "wrap") {
    if (state.tokenIn.id === "NEAR") {
      tx.push(nearDeposit);
    } else {
      tx.push(nearWithdraw);
    }

    return Near.call(tx);
  }

  if (register === null) {
    tx.push({
      contractName:
        state.tokenOut.id === "NEAR" ? "wrap.near" : state.tokenOut.id,
      methodName: "storage_deposit",
      deposit: expandToken(0.1, 24).toFixed(),
      gas: expandToken(50, 12),
      args: {
        registration_only: true,
        account_id: accountId,
      },
    });
  }

  if (state.tokenIn.id === "NEAR") {
    tx.push(nearDeposit);
  }

  const minAmountOut = expandToken(
    new Big(state.amountOut)
      .mul(1 - Number(state.slippagetolerance) / 100)
      .toFixed(state.tokenOut.decimals, 0),
    state.tokenOut.decimals
  ).toFixed();

  tx.push({
    methodName: "ft_transfer_call",
    contractName: state.tokenIn.id === "NEAR" ? "wrap.near" : state.tokenIn.id,
    gas: expandToken(180, 12),
    deposit: new Big("1").toFixed(),
    args: {
      receiver_id: "v2.ref-finance.near",
      amount: expandToken(state.amountIn, state.tokenIn.decimals).toFixed(0, 0),
      msg: JSON.stringify({
        actions: [
          {
            pool_id: Number(state.estimate.pool.id),
            token_in:
              state.tokenIn.id === "NEAR" ? "wrap.near" : state.tokenIn.id,
            token_out:
              state.tokenOut.id === "NEAR" ? "wrap.near" : state.tokenOut.id,
            amount_in: expandToken(
              state.amountIn,
              state.tokenIn.decimals
            ).toFixed(0, 0),
            min_amount_out: minAmountOut,
          },
        ],
      }),
    },
  });

  if (state.tokenOut.id === "NEAR") {
    tx.push({
      contractName: "wrap.near",
      methodName: "near_withdraw",
      deposit: new Big("1").toFixed(),
      args: {
        amount: minAmountOut,
      },
    });
  }

  Near.call(tx);
};

return (
  <>
    <h3>Send ERC-20 tokens</h3>
    <div class="mb-3">
      <label for="selectToken">Select token</label>
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

    <div class="mb-3">
      <label for="send-to" class="form-label">
        Recepient address
      </label>
      <input
        value={state.sendTo}
        class="form-control"
        id="send-to"
        placeholder="vitalik.eth"
        onChange={(e) => setSendTo(e.target.value)}
      />
      {state.receiver && (
        <div class="text-secondary mt-3">Resolved to {state.receiver}</div>
      )}
      {state.receiverBalance != "0" && (
        <div class="text-secondary mt-3">
          Receiver's balance: {state.receiverBalance}
        </div>
      )}

      {state.senderBalance != "0" && (
        <div class="text-secondary mt-3">
          Sender's balance: {state.senderBalance}
        </div>
      )}
    </div>

    <div class="mb-3">
      <label for="amount" class="form-label">
        Enter the amount
      </label>
      <input
        value={state.amount}
        class="form-control"
        id="amount"
        placeholder=""
        onChange={(e) => State.update({ amount: e.target.value })}
      />
    </div>
    <div class="mb-3">
      <button onClick={sendTokens}>Send</button>
    </div>
    <Container>
      <div
        style={{
          fontSize: "20px",
          fontWeight: "700",
        }}
      >
        Swap
      </div>
      {
        <Widget
          src="weige.near/widget/ref-swap-getEstimate"
          props={{
            loadRes: state.loadRes,
            tokenIn: state.tokenIn,
            tokenOut: state.tokenOut,
            amountIn: state.amountIn || 0,
            reloadPools: state.reloadPools,
            setReloadPools: (value) =>
              State.update({
                reloadPools: value,
              }),
          }}
        />
      }

      {
        <Widget
          src={`weige.near/widget/ref-token-input`}
          props={{
            amount: state.amountIn,
            disableInput: false,
            setAmount: (value) => State.update({ amountIn: value }),
            token: state.tokenIn,
            handleSelect: (metadata) =>
              State.update({
                tokenIn: metadata,
              }),
          }}
        />
      }
      {Exchange}
      {
        <Widget
          src={`weige.near/widget/ref-token-input`}
          props={{
            amount: state.amountOut,
            disableInput: true,
            setAmount: (value) => State.update({ amountOut: value }),
            token: state.tokenOut,
            handleSelect: (metadata) =>
              State.update({
                tokenOut: metadata,
              }),
          }}
        />
      }

      <RateLine>
        <RefreshWrapper
          onClick={() => {
            clearTimeout(timerInterval);
            State.update({
              reloadPools: true,
            });
            Storage.set("count", 21);
          }}
        >
          <Refresh>{Storage.get("count") - 1}</Refresh>
          <RefreshText>Refresh</RefreshText>
        </RefreshWrapper>

        <RateWrapper>{`1 ${state.tokenIn.symbol} ≈ ${
          Number(state.amountIn) === 0
            ? "-"
            : new Big(state.amountOut || 0)
                .div(state.amountIn || 1)
                .toFixed(4, 0)
        } ${state.tokenOut.symbol}`}</RateWrapper>
      </RateLine>
      <Widget
        src={`weige.near/widget/SlippageTolerance`}
        props={{
          showSetting: state.showSetting,
          updateSetting: () =>
            State.update({
              showSetting: !state.showSetting,
            }),
          slippagetolerance: state.slippagetolerance,
          setSlippagetolerance: (value) => {
            State.update({
              slippagetolerance: value,
            });
          },
        }}
      />

      <Widget
        src="weige.near/widget/ref-swap-button"
        props={{
          accountId,
          notEnough,
          canSwap,
          callTx,
          requestSignIn: props.requestSignIn,
          noPool: state.estimate?.sig === "no_pool",
        }}
      />
    </Container>
  </>
);
