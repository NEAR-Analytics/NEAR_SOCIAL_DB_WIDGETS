let accountId = context.accountId;

// if (!accountId) {
//   return "Please sign in with NEAR wallet";
// }

const profile = socialGetr(`${accountId}/profile`);

if (profile === null) {
  IpfsImageUpload();
  return "Uploading NFT";
}

const handleMint = () => {
  if (!(state.title && state.description && state.image.cid)) {
    return;
  }
  const metadata = {
    name: state.title,
    description: state.description,
    properties: [],
    image: `ipfs://${state.image.cid}`,
  };
  console.log("come", metadata);
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: metadata,
  }).then((res) => {
    console.log("GO ON SOUN", res);
    const cid = res.body.cid;
    const gas = 200000000000000;
    const deposit = 10000000000000000000000;
    Near.call([
      {
        contractName: "genadrop-contract.nftgen.near",
        methodName: "nft_mint",
        args: {
          token_id: `${Date.now()}`,
          metadata: {
            title: state.title,
            description: state.description,
            media: `https://ipfs.io/ipfs/${state.image.cid}`,
            reference: `ipfs://${cid}`,
          },
          receiver_id: accountId,
        },
        gas: gas,
        deposit: deposit,
      },
    ]);
  });
};

initState({
  title: "",
  description: "",
  accountId: accountId,
});

const onChangeTitle = (title) => {
  State.update({
    title,
  });
};

const onChangeDesc = (description) => {
  State.update({
    description,
  });
};
// in the future add mint to an address
return (
  <div>
    <h1>💧Mint NFT on GenaDrop</h1>
    <div className="row">
      <div className="col-lg-6">
        <div>
          Title:
          <input type="text" onChange={(e) => onChangeTitle(e.target.value)} />
        </div>
        <div>
          Description:
          <input type="text" onChange={(e) => onChangeDesc(e.target.value)} />
        </div>
      </div>
      <div className="flex-grow-1">
        <IpfsImageUpload
          image={state.image}
          className="btn btn-outline-secondary border-0 rounded-3"
        />
      </div>
      <div className="col-lg-6">
        <div>
          <h2>👀 Preview</h2>
        </div>
        <div>
          <img
            src={`https://ipfs.io/ipfs/` + state.image.cid}
            alt="uploaded image"
            width="800"
            height="600"
          />
        </div>
        {state.accountId && (
          <div>
            <button onClick={handleMint}>Mint</button>
          </div>
        )}
        {!state.accountId && (
          <div>
            <button className="btn btn-danger mt-3">Login to Mint</button>
          </div>
        )}
      </div>
    </div>
  </div>
);
