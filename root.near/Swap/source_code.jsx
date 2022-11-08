initState({
  amount: 1,
  tokenIn: "wrap.near",
  tokenOut: "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near",
});

const OnSwapClick = () => {
  console.log(
    `Swap ${state.amount} from ${state.tokenIn} to ${state.tokenOut}`
  );
  Near.call(state.tokenIn, "ft_transfer_call", {
    receiver_id: "v2.ref-finance.near",
    amount: state.amount + "000000000000000000000000",
    msg: `{\"force\":0,\"actions\":[{\"pool_id\":4,\"token_in\":\"${state.tokenIn}\",\"token_out\":\"${state.tokenOut}\",\"amount_in\":\"994528598528091931504769\",\"min_amount_out\":\"3536895\"},{\"pool_id\":2769,\"token_in\":\"wrap.near\",\"token_out\":\"token.cheddar.near\",\"amount_in\":\"5471401471908068495231\",\"min_amount_out\":\"0\"},{\"pool_id\":861,\"token_in\":\"token.cheddar.near\",\"token_out\":\"dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near\",\"min_amount_out\":\"24518\"}]}`,
  });
};

return (
  <div>
    From {state.tokenIn} to
    <input type="number" value={state.amount} /> {state.tokenOut}
    <p>
      <a onClick={onSwapClick}>Swap</a>
    </p>
  </div>
);
