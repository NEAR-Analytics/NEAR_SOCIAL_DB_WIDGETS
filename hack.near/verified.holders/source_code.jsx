const data = Social.keys("*/profile", "final");

if (!data) {
  return "Loading...";
}

const accounts = Object.entries(data);
const allHolders = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];

  const nftData = Near.view("mint.sharddog.near", "nft_supply_for_owner", {
    account_id: accountId,
  });

  console.log(nftData);

  if (nftData && nftData > 0) {
    allHolders.push(
      <div className="mb-2" key={accountId}>
        <Widget src="near/widget/AccountProfileCard" props={{ accountId }} />
      </div>
    );
  }
}

return (
  <>
    <h3 className="m-3">ShardDog NFT Holders</h3>
    <h5 className="m-3">{allHolders.length} Total</h5>
    <div className="m-3">{allHolders}</div>
  </>
);
