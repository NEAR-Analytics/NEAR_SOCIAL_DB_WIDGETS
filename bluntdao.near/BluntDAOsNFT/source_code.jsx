const accountId = props.accountId || context.accountId;

const f = fetch(
  `https://api.kitwallet.app/account/bluntdao.near/likelyNFTsFromBlock`
);

if (!f.ok) {
  return "Loading";
}

const allNfts = f.body.list;

return (
  <>
    {allNfts.map((contractId) => (
      <Widget
        src="mob.near/widget/NftCollection"
        props={{ accountId, contractId }}
      />
    ))}
  </>
);
