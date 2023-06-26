// const YoctoToNear = (amountYocto) =>
//   new Big(amountYocto).div(new Big(10).pow(24)).toString();

// const accountId = props.accountId || context.accountId;
// const contractId = props.contractId || context.contractId || "toolipse.near";
// const marketId = "simple.market.mintbase1.near";
// const AFFILIATE_ACCOUNT = props.affiliateAccount || "toolipse.near";

// function handleMint() {
//   const gas = 200000000000000;
//   const deposit = new Big(1).toFixed(0);

//   Near.call(
//     "simple.market.mintbase1.near",
//     "mint",
//     {
//       owner_id: "evrything.near",
//       metadata: {},
//       num_to_mint: 1,
//       royalty_args: null,
//       token_ids_to_mint: null,
//     },
//     gas,
//     deposit
//   );
// }

// return <button onClick={handleMint}>mint</button>;

return (
  <MintButton
    nftContractId={"hello"}
    reference={"hello"}
    ownerId={context.accountId}
  />
);
