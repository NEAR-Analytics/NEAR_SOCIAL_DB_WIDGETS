const toAPY = (v) => Math.round(v * 100) / 100;

const { assets, rewards } = state;

const hasData = assets.length > 0 && rewards.length > 0;

const onLoad = (data) => {
  State.update(data);
};

const allAssets = hasData
  ? assets.map((asset) => {
      const r = rewards.find((a) => a.token_id === asset.token_id);
      const totalApy = r.apyBase + r.apyRewardTvl + r.apyReward;

      return (
        <li class="list-group-item">
          <span>{asset.metadata.symbol}</span>
          <span>({toAPY(totalApy)}% APY)</span>
        </li>
      );
    })
  : undefined;

return (
  <div class="card" style={{ maxWidth: "300px" }}>
    {!hasData && (
      <Widget src="ciocan.near/widget/burrow-data" props={{ onLoad }} />
    )}
    <div class="card-body">
      <h4>Burrow supplied assets</h4>
      <ul class="list-group list-group-flush mb-2">{allAssets}</ul>
      <a class="btn btn-primary" href="https://burrow.cash" target="_blank">
        Deposit on Burrow
      </a>
    </div>
  </div>
);
