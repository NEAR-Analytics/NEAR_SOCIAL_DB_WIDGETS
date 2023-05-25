const accountId = context.accountId;
const contractID = "mmc.nfts.fewandfar.near";
const contractID2 = "mmc-pups.nfts.fewandfar.near";
const contractID3 = "copy🍝.near";

State.init({
  contract: contractID,
  contract2: contractID2,
  contract3: contractID3,
});
const onChangeContract = (contract3) => {
  State.update({
    contract3,
  });
};
const DETECTIVES = Near.view(state.contract, "nft_total_supply");
const PUPS = Near.view(state.contract2, "nft_total_supply");
const HUMAN = Near.view(state.contract3, "nft_total_supply");

return (
  <>
    <div>
      <div>
        <img
          src="https://pbs.twimg.com/media/FZZ6MnTX0AEne0J?format=jpg&name=4096x4096"
          alt="MMCLOGO"
          width="266"
          height="97"
        ></img>
        <hr></hr>
        <h4>{`Hello ${accountId}!👋`}</h4>
        <p>
          Below you can view the current supply of <b>MMC Detectives</b> and
          <b>Undercover Pups.</b>
        </p>
        <p>
          You can also test it yourself by inputting a .near contract address at
          the bottom of the page.
        </p>
        <hr></hr>
        <h3>MMC Detectives</h3>
        <h6>🛑 SOLD OUT 🛑</h6>
        <img
          src="https://byzantion.mypinata.cloud/ipfs/QmcABQEkMb6sTQ8bzwh4XdtkqHLTUeTkwbwzHSbsUn7mxG/505.jpeg?img-width=850&img-height=850&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp"
          alt="MMCDETECTIVE1"
          width="150"
          height="150"
        ></img>
        <h3>NFTs Minted: {DETECTIVES}🕵️‍♂️</h3>
        <a href="https://www.tradeport.xyz/near/collection/mmc.nfts.fewandfar.near?tab=marketview">
          🔗---MMC Detectives on Tradeport
        </a>
        <hr></hr>
      </div>
    </div>
    <div>
      <div>
        <h3>MMC Undercover Pups</h3>
        <h6>MINTING NOW!</h6>
        <img
          src="https://byzantion.mypinata.cloud/ipfs/QmdwBQGzcYELCCRw3234Un9C4a5EJHncki6nsPywamwnBQ/101.png?img-width=850&img-height=850&img-fit=cover&img-quality=80&img-onerror=redirect&img-fit=pad&img-format=webp"
          alt="MMCDPUP"
          width="150"
          height="150"
        ></img>
        <h3>NFTs Minted: {PUPS}🐶</h3>
        <a href="https://fewfar.com/launchpad/murder-mystery-collective-undercover-pups-near/">
          🔗---Mint on FewFar!
        </a>
        <br></br>
        <a href="https://www.tradeport.xyz/near/collection/mmc-pups.nfts.fewandfar.near?tab=marketview">
          🔗---MMC Pups on Tradeport
        </a>
        <hr></hr>
      </div>
      <div>
        <div>
          <h3>Try it for yourself 🫵</h3>
          <h3>NFTs Minted: {HUMAN}</h3>
        </div>
        <div className="row">
          <div className=" col-lg-12 mb-2">
            Input the Contract ID below:
            <input
              type="text"
              placeholder={state.contract3}
              onChange={(e) => onChangeContract(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  </>
);
