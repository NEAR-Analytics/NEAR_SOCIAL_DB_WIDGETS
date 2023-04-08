let accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const profile = socialGetr(`${accountId}/profile`);

if (profile === null) {
  IpfsImageUpload();
  return "Loading";
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

const ImageUploadCard = styled.div`
display:flex;
flex-flow: column nowrap;
align-items: center;
  width:80%;
  border: 2px dashed #0d99ff;
  border-radius: 1rem;
  box-shadow: 4px 4px 45px 4px rgba(0,0,0,.2);
  margin:0 auto;
  padding:1rem;
`;
const Main = styled.div`
  font-family: "SF Pro Display",sans-serif;
`;

return (
  <Main className="vh-100">
    {state.image.cid ? (
      <div>
        <div>Mint NFT on genadrop</div>
        <div>
          Title:
          <input type="text" onChange={(e) => onChangeTitle(e.target.value)} />
        </div>
        <div>
          Description:
          <input type="text" onChange={(e) => onChangeDesc(e.target.value)} />
        </div>
        <div>Preview</div>
        <div>
          <img
            src={`https://ipfs.io/ipfs/` + state.image.cid}
            alt="uploaded image"
            width="400"
            height="300"
          />
        </div>
        <IpfsImageUpload
          image={state.image}
          className="btn btn-outline-secondary border-0 rounded-3"
        />
        <div>
          <button onClick={handleMint}>Mint</button>
        </div>
      </div>
    ) : (
      <div>
        <h3>
          Upload a image to create NFTs on any of our supported blockchains
          super fast!
        </h3>
        <ImageUploadCard className="flex-grow-1">
          <IpfsImageUpload
            image={state.image}
            className="btn btn-outline-secondary border-0 rounded-3"
          />
          <div>
            <div>Drag and Drop your image file here</div>
            <p>
              We support .jpg, .jpeg, .png, .webp, .gif files and deploy to Near
            </p>
            <p>Max file size: 20mb</p>
          </div>
        </ImageUploadCard>
      </div>
    )}
  </Main>
);
