let accountId = context.accountId;

if (!accountId) {
  return <div />;
}

const shrinkToken = (value, decimals, fixed) => {
  return new Big(value).div(new Big(10).pow(decimals)).toFixed(fixed);
};

const { assets, rewards, account } = state;

const hasData = assets.length > 0 && rewards.length > 0 && account;

const onLoad = (data) => {
  State.update(data);
};

const unclaimedRewardsMap = account
  ? account.farms?.reduce((prev, curr) => {
      for (const reward of curr.rewards) {
        const t = prev[reward.reward_token_id];
        if (t) {
          prev[reward.reward_token_id] = Big(t)
            .plus(Big(reward.unclaimed_amount))
            .toFixed();
        } else {
          prev[reward.reward_token_id] = Big(reward.unclaimed_amount).toFixed();
        }
      }
      return prev;
    }, {})
  : {};

const unclaimedRewards = Object.keys(unclaimedRewardsMap).map((id) => {
  const asset = assets.find((a) => a.token_id === id);
  const decimals = asset.metadata.decimals + asset.config.extra_decimals;
  return {
    id,
    unclaimed: shrinkToken(unclaimedRewardsMap[id], decimals, 4),
    symbol: asset.metadata.symbol,
  };
});

const handleClaimAll = () => {
  Near.call({
    contractName: "contract.main.burrow.near",
    methodName: "account_farm_claim_all",
  });
};

return (
  <div>
    {!hasData && (
      <Widget src="ciocan.near/widget/burrow-data" props={{ onLoad }} />
    )}
    <h6>Unclaimed rewards</h6>
    <ul class="list p-0">
      {unclaimedRewards.map((reward) => (
        <li class="list-inline-item align-middle">
          <span class="badge rounded-pill bg-light text-dark">
            {reward.unclaimed}
          </span>
          <span class="align-middle">{reward.symbol}</span>
        </li>
      ))}
    </ul>
    <button type="button" class="btn btn-light" onClick={handleClaimAll}>
      Claim all rewards
    </button>
  </div>
);
