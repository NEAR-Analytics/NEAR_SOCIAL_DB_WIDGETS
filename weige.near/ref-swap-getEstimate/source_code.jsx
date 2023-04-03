const shrinkToken = (value, decimals) => {
  return new Big(value || 0).div(new Big(10).pow(decimals || 24));
};

const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};

const {
  tokenIn: tokenInFromProps,
  tokenOut: tokenOutFromProps,
  amountIn,
  loadRes,
  reloadPools,
  setReloadPools,
} = props;

const tokenIn =
  tokenInFromProps.id === "NEAR"
    ? { ...tokenInFromProps, id: "wrap.near" }
    : tokenInFromProps;

const tokenOut =
  tokenOutFromProps.id === "NEAR"
    ? { ...tokenOutFromProps, id: "wrap.near" }
    : tokenOutFromProps;

const FEE_DIVISOR = 10000;

const REF_FI_CONTRACT_ID = "v2.ref-finance.near";

const getSinglePoolEstimate = (tokenIn, tokenOut, pool, amountIn) => {
  const allocation = amountIn;

  const amount_with_fee =
    Number(allocation) * (FEE_DIVISOR - pool.total_fee || pool.fee || 0);

  const in_balance = shrinkToken(
    pool.amounts[pool.token_account_ids[0] === tokenIn.id ? 0 : 1],
    tokenIn.decimals
  );

  const out_balance = shrinkToken(
    pool.amounts[pool.token_account_ids[0] === tokenIn.id ? 1 : 0],

    tokenOut.decimals
  );

  const estimate = new Big(
    (
      (amount_with_fee * Number(out_balance)) /
      (FEE_DIVISOR * Number(in_balance) + amount_with_fee)
    ).toString()
  ).toFixed();

  return {
    estimate,
    pool,
    tokenIn,
    tokenOut,
  };
};

const getStablePoolDetail = (pool_id, pool_kind) => {
  if (pool_kind === "RATED_SWAP") {
    const pool_info = Near.view(REF_FI_CONTRACT_ID, "get_rated_pool", {
      pool_id: Number(pool_id),
    });
    return {
      ...pool_info,
      id: pool_id,
    };
  } else {
    const pool_info = Near.view(REF_FI_CONTRACT_ID, "get_stable_pool", {
      pool_id: Number(pool_id),
    });
    return {
      ...pool_info,
      id: pool_id,
      rates: pool_info.c_amounts.map((_) => expandToken("1", 18).toFixed()),
    };
  }
};

const returnNull = () => {
  loadRes({});
  return <div />;
};

const wrapOperation =
  [tokenIn, tokenOut].every((meta) => meta.id === "wrap.near") &&
  !![tokenIn, tokenOut].find((meta) => meta.symbol === "NEAR");

if (wrapOperation) {
  loadRes({
    estimate: amountIn,
    tokenIn,
    tokenOut,
    pool: "wrap",
  });

  return <div />;
}

if (tokenIn.id === tokenOut.id) return returnNull();

let topPools = JSON.parse(
  fetch("https://indexer.ref.finance/list-top-pools").body
);

const reloadTopPools = () => {
  asyncFetch("https://indexer.ref.finance/list-top-pools").then((res) => {
    const data = res.body;
    topPools = JSON.parse(data);
    setReloadPools(false);
  });
};

if (reloadPools) {
  reloadTopPools();
}

if (!topPools) return returnNull();

const poolsThisPair = topPools.filter(
  (p) =>
    p.token_account_ids.includes(tokenIn.id) &&
    p.token_account_ids.includes(tokenOut.id)
);

const poolThisPair = poolsThisPair.find((p) => p.token_account_ids.length > 2)
  ? poolsThisPair.find((p) => p.token_account_ids.length > 2)
  : poolsThisPair[0];

if (!poolThisPair) {
  return returnNull();
}

if (poolThisPair.pool_kind === "SIMPLE_POOL") {
  const res = getSinglePoolEstimate(tokenIn, tokenOut, poolThisPair, amountIn);

  loadRes(res);
} else {
  const stablePoolDetail = getStablePoolDetail(
    poolThisPair.id,
    poolThisPair.pool_kind
  );

  const STABLE_LP_TOKEN_DECIMALS =
    poolThisPair.pool_kind === "STABLE_SWAP" ? 18 : 24;

  return (
    <Widget
      src="weige.near/widget/ref-stable-swap-algorithm"
      props={{
        loadRes: loadRes,
        tokenIn,
        tokenOut,
        stablePool: stablePoolDetail,
        stablePoolDecimal: STABLE_LP_TOKEN_DECIMALS,
        amountIn: amountIn,
        pool: poolThisPair,
      }}
    />
  );
}

return <div />;
