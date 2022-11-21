async function getAssets() {
  const assets = Near.view("contract.main.burrow.near", "get_assets_paged");
  const tokenIds = assets.map(([id]) => id);

  const assetsDetailed = await Promise.all(
    tokenIds.map((token_id) =>
      Near.view("contract.main.burrow.near", "get_asset", {
        args: { token_id },
      })
    )
  );

  return assetsDetailed;
}

const x = await getAssets();
console.log(x);

return <div>Hello Burrow</div>;
