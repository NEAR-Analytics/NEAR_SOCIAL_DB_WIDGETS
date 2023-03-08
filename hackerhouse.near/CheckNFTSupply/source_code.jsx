const contractID = "og-sbt.i-am-human.near"; // for nft contract

State.init({
  contract: contractID,
});
const onChangeContract = (contract) => {
  State.update({
    contract,
  });
};
const humans = Near.view(state.contract, "nft_total_supply"); // checks total minted // total non expired supply

return (
  <div>
    <div>
      <h1>Number of NFTs: {humans}</h1>
    </div>
    <div className="row">
      <div className=" col-lg-12 mb-2">
        Contract ID: (Checks NFT Supply)
        <input
          type="text"
          placeholder={state.contract}
          onChange={(e) => onChangeContract(e.target.value)}
        />
      </div>
    </div>
  </div>
);
