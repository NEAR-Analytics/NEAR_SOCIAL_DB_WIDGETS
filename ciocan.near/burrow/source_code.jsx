const toAPY = (v) => Math.round(v * 100) / 100;

const { assets, rewards } = state;

const onLoad = (data) => {
  console.log("onLoad", data);
  if (!assets) {
    State.update(data);
  }
  return data;
};

const allAssets = assets
  ? assets.map((asset) => {
      const r = rewards?.find((a) => a.token_id === asset.token_id);
      return (
        <li class="list-group-item">
          <span>{asset.metadata.symbol}</span>
          <span>({toAPY(r.apyBase + r.apyRewardTvl + r.apyReward)}% APY)</span>
        </li>
      );
    })
  : null;

return (
  <div class="card" style={{ maxWidth: "300px" }}>
    <Widget src="ciocan.near/widget/Burrow.Data" props={{ onLoad }} />
    <div class="card-body">
      <h4>Burrow supplied assets</h4>
      <ul class="list-group list-group-flush mb-2">{allAssets}</ul>
      <a class="btn btn-primary" href="https://burrow.cash" target="_blank">
        Deposit on Burrow
      </a>
    </div>
  </div>
);
