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
    Number(allocation) * (FEE_DIVISOR - pool.fee || pool.total_fee || 0);

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
  loadRes(null);
  return <div />;
};

const wrapOperation =
  [tokenIn, tokenOut].every((meta) => meta.id === "wrap.near") &&
  !![tokenIn, tokenOut].find((meta) => meta.symbol === "NEAR");

console.log(wrapOperation, tokenIn, tokenOut, "wrap operation1");
if (wrapOperation) {
  loadRes({
    estimate: amountIn,
    tokenIn,
    tokenOut,
    pool: "wrap",
  });

  return <div />;
}

const poolRes = fetch("https://indexer.ref.finance/list-top-pools");

if (!poolRes) returnNull();

console.log(poolRes, "pool res");

const topPools = JSON.parse(poolRes.body);

console.log(topPools, "top pools");

if (!topPools) returnNull();

const poolThisPair = topPools.find(
  (p) =>
    p.token_account_ids.includes(tokenIn.id) &&
    p.token_account_ids.includes(tokenOut.id)
);

if (!poolThisPair) {
  returnNull();
}

console.log(poolThisPair, "pool this pair");

if (poolThisPair.pool_kind === "SIMPLE_POOL") {
  const res = getSinglePoolEstimate(tokenIn, tokenOut, poolThisPair, amountIn);

  console.log(res, "res");

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
