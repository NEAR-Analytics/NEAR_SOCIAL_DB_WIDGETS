initState({
  nftData: [],
  address: "",
});
// Contract address
//const address = "ch1ch0gz.eth";

let requestOptions = {
  method: "get",
  redirect: "follow",
};

const fetchData = (address) => {
  // Alchemy URL

  const baseURL = `https://eth-mainnet.g.alchemy.com/v2/pO2FSYkeXP28d_ezEqBdkYLNZc4Fa_0Y`;
  const url = `${baseURL}/getNFTs/?owner=${address}`;

  State.update({ nftData: [] });

  asyncFetch(url, requestOptions)
    .then((response) => {
      const nfts = response.body.ownedNfts.map((n) => {
        const nft = {
          src: n.metadata.image,
          title: n.metadata.name,
        };
        if (nft.src === undefined) {
          nft.src = n.metadata.image_data;
        } else if (nft.src.startsWith("ipfs")) {
          nft.src = `https://ipfs.near.social/ipfs/` + nft.src.substring(7);
        }

        return nft;
      });

      State.update({ nftData: nfts });
    })
    .catch((error) => console.log("error", error));
};
return (
  <>
    <div class="mb-3">
      <label>Enter the address</label>
      <input
        value={address}
        placeholder=""
        onChange={(event) => State.update({ address: event.target.value })}
      />
      <button onClick={() => fetchData(state.address)}>
        Fetch a NFT Collection
      </button>
    </div>
    <div className="mt-3">
      <h5>NFT Collection</h5>
      {state.nftData.map((n) => {
        return (
          <div
            style={{ width: "300px", display: "inline-block", margin: "6px" }}
          >
            <img
              src={n.src}
              title={n.title}
              style={{ maxWidth: "300px", maxHeight: "300px" }}
            />
            <p style={{ width: "300px", display: "inline-block" }}>{n.title}</p>
          </div>
        );
      })}
    </div>
  </>
);
