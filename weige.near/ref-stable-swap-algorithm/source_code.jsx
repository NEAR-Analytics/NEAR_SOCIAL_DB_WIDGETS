const shrinkToken = (value, decimals) => {
  return new Big(value || 0).div(new Big(10).pow(decimals || 24)).toFixed();
};

const FEE_DIVISOR = 10000;

const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals)).toFixed();
};

const tradeFee = (amount, trade_fee) => {
  return (amount * trade_fee) / FEE_DIVISOR;
};

const calc_d = (amp, c_amounts) => {
  const token_num = c_amounts.length;

  let sum_amounts = 0;
  c_amounts.forEach((amount) => (sum_amounts += Number(amount)));

  let d_prev = 0;
  let d = sum_amounts;
  for (let i = 0; i < 256; i++) {
    let d_prod = d;
    for (let c_amount of c_amounts) {
      d_prod = (d_prod * d) / (c_amount * token_num);
    }
    d_prev = d;
    const ann = amp * token_num ** token_num;
    const numerator = d_prev * (d_prod * token_num + ann * sum_amounts);
    const denominator = d_prev * (ann - 1) + d_prod * (token_num + 1);
    d = numerator / denominator;
    if (Math.abs(d - d_prev) <= 1) break;
  }
  return d;
};

const calc_y = (amp, x_c_amount, current_c_amounts, index_x, index_y) => {
  const token_num = current_c_amounts.length;
  const ann = amp * token_num ** token_num;
  const d = calc_d(amp, current_c_amounts);
  let s = x_c_amount;
  let c = (d * d) / x_c_amount;
  for (let i = 0; i < token_num; i++) {
    if (i != index_x && i != index_y) {
      s += current_c_amounts[i];
      c = (c * d) / current_c_amounts[i];
    }
  }
  c = (c * d) / (ann * token_num ** token_num);
  const b = d / ann + s;
  let y_prev = 0;
  let y = d;
  for (let i = 0; i < 256; i++) {
    y_prev = y;
    const y_numerator = y ** 2 + c;
    const y_denominator = 2 * y + b - d;
    y = y_numerator / y_denominator;
    if (Math.abs(y - y_prev) <= 1) break;
  }

  return y;
};

const calc_swap = (
  amp,
  in_token_idx,
  in_c_amount,
  out_token_idx,
  old_c_amounts,
  trade_fee
) => {
  const y = calc_y(
    amp,
    in_c_amount + old_c_amounts[in_token_idx],
    old_c_amounts,
    in_token_idx,
    out_token_idx
  );
  const dy = old_c_amounts[out_token_idx] - y;
  const fee = tradeFee(dy, trade_fee);
  const amount_swapped = dy - fee;
  return [amount_swapped, fee, dy];
};

const getSwappedAmount = (
  tokenInId,
  tokenOutId,
  amountIn,
  stablePool,
  stablePoolDecimal
) => {
  const amp = stablePool.amp;
  const trade_fee = stablePool.total_fee;

  const in_token_idx = stablePool.token_account_ids.findIndex(tokenInId);
  const out_token_idx = stablePool.token_account_ids.findIndex(tokenOutId);

  const STABLE_LP_TOKEN_DECIMALS = stablePoolDecimal;

  const rates = stablePool.rates.map((r) =>
    shrinkToken(r, STABLE_LP_TOKEN_DECIMALS)
  );

  const base_old_c_amounts = stablePool.c_amounts.map((amount) =>
    shrinkToken(amount, STABLE_LP_TOKEN_DECIMALS)
  );

  const old_c_amounts = base_old_c_amounts
    .map((amount, i) =>
      expandToken(
        new Big(amount || 0).times(new Big(rates[i])).toFixed(),
        STABLE_LP_TOKEN_DECIMALS
      )
    )
    .map((amount) => Number(amount));

  const in_c_amount = Number(
    expandToken(
      new Big(amountIn).times(new Big(rates[in_token_idx])).toFixed(),
      STABLE_LP_TOKEN_DECIMALS
    )
  );

  const [amount_swapped, fee, dy] = calc_swap(
    amp,
    in_token_idx,
    in_c_amount,
    out_token_idx,
    old_c_amounts,
    trade_fee
  );

  const res = [
    amount_swapped / Number(rates[out_token_idx]),
    fee,
    dy / Number(rates[out_token_idx]),
  ];

  const amountOut = res[0] < 0 ? "0" : new Big(res[0]).toFixed(0, 0);

  return shrinkToken(amountOut, STABLE_LP_TOKEN_DECIMALS);
};

const { tokenIn, tokenOut, amountIn, stablePool, stablePoolDecimal, loadRes } =
  props;

const res = getSwappedAmount(
  tokenIn.id,
  tokenOut.id,
  amountIn,
  stablePool,
  stablePoolDecimal
);

loadRes({
  tokenIn,
  tokenOut,
  estimate: res,
});

return <div />;
