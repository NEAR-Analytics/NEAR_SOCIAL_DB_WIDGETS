const auroraCOntract = "0xe53bC42B6b25a1d548B73636777a0599Fd27fE5c";
const polygonContract = "0x436AEceaEeC57b38a17Ebe71154832fB0fAFF878";
const celoContract = "0xC291846A587cf00a7CC4AF0bc4EEdbC9c3340C36";
const avaxContract = "0x43dBdfcAADD0Ea7aD037e8d35FDD7c353B5B435b";
const arbitrumContract = "0x959a2945185Ec975561Ac0d0b23F03Ed1b267925";
const nearContract = "genadrop.nftgen.near";
const mintSingle = [
  "function mint(address to, uint256 id, uint256 amount, string memory uri, bytes memory data) public {}",
];
let accountId = context.accountId;
const contractAddresses = {
  137: [polygonContract, "Polygon", "https://polygonscan.com/tx/"],
  1313161554: [auroraCOntract, "Aurora", "https://explorer.aurora.dev/tx/"],
  42220: [celoContract, "Celo", "https://explorer.celo.org/mainnet/tx/"],
  43114: [avaxContract, "Avalanche", "https://snowtrace.io/tx/"],
  42161: [arbitrumContract, "Arbitrum", "https://arbiscan.io/tx/"],
  0: [nearContract, "Near"],
};
const chains = [
  {
    id: "137",
    name: "Polygon",
  },
  {
    id: "1313161554",
    name: "Aurora",
  },
  {
    id: "42220",
    name: "Celo",
  },
  {
    id: "43114",
    name: "Avax",
  },
  {
    id: "42161",
    name: "Arbitrum",
  },
  {
    id: "0",
    name: "Near",
  },
];

const handleMint = () => {
  console.log("it's here", state.title && state.description && state.image.cid);
  if (!(state.title && state.description && state.image.cid)) {
    return;
  }
  if (state.selectedChain == "0") {
    const gas = 200000000000000;
    const deposit = 10000000000000000000000;
    const metadata = {
      name: state.title,
      description: state.description,
      properties: [],
      image: `ipfs://${state.image.cid}`,
    };
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: metadata,
    }).then((res) => {
      const cid = res.body.cid;
      const Id = Math.floor(Math.random() * (9999999 - 100000 + 1) + 100000);
      console.log("in the promise", res, Id);
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
    return;
  }
  console.log("passed checks");
  let networkId = Ethers.provider()._network.chainId;

  const CA = contractAddresses[state.selectedChain][0] || "137";

  console.log("CONTRACT ADD", CA);

  const contract = new ethers.Contract(
    CA,
    mintSingle,
    Ethers.provider().getSigner()
  );
  const metadata = {
    name: state.title,
    description: state.description,
    properties: [],
    image: `ipfs://${state.image.cid}`,
  };
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: metadata,
  }).then((res) => {
    const cid = res.body.cid;
    const Id = Math.floor(Math.random() * (9999999 - 100000 + 1) + 100000);
    console.log("in the promse", res, Id);
    const recipient = Ethers.send("eth_requestAccounts", []);
    contract
      .mint(recipient[0], Id, 1, `ipfs://${cid}`, "0x")
      .then((transactionHash) => transactionHash.wait())
      .then((ricit) => {
        console.log("receipt::", ricit);
        State.update({
          link: `${
            contractAddresses[state.selectedChain][2] + ricit.transactionHash
          }`,
        });
      });
  });
};
if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  console.log("accounts:", accounts, state.sender);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    Ethers.provider()
      .getNetwork()
      .then((data) => {
        State.update({
          selectedChain: data.chainId,
        });
      });
  }

  console.log("in between", state.sender);

  if (accountId) {
    State.update({ sender: accountId });
    State.update({
      selectedChain: "0",
    });
  }
}
State.init({
  title: "",
  description: "",
});
const onChangeTitle = (title) => {
  State.update({
    title,
  });
};

const handleChainChange = (event) => {
  console.log(
    "get what we doing:",
    event.target.value,
    event.target.value == "0",
    !accountId
  );
  if (event.target.value == "0") {
    if (!accountId) {
      console.log("not what we thought,:", accountId);
      return;
    }
    State.update({
      selectedChain: event.target.value,
    });
  }
  console.log("encts here", Ethers.send);
  Ethers.send("wallet_switchEthereumChain", [
    {
      chainId: "0x" + Number(event.target.value).toString(16),
    },
  ]).then((data) => console.log("done!!!", data));
  console.log("what happens after");
  State.update({
    selectedChain: event.target.value,
  });
  console.log("afters", state.selectedChain);
};

const onChangeDesc = (description) => {
  console.log("Log ciritcal critics:", state.selectedChain, state.title);
  State.update({
    description,
  });
};
// if (state.sender === undefined) {
//   console.log("of course it's undefined", ethers);
//   const accounts = Ethers.send("eth_requestAccounts", []);
//   console.log("account", accounts);
//   if (accounts.length) {
//     State.update({ sender: accounts[0] });
//     console.log("set sender", accounts[0]);
//   }
// }

const Heading = styled.p`
  margin: 10px auto 10px auto;
  font-size: 1em;
  color:#0f1d40;
  width:60%;
  text-align: center;
  font-family: "SF Pro Display",sans-serif;
`;

const ImageUploadCard = styled.div`
display:flex;
flex-flow: column nowrap;
align-items: center;
  width:80%;
  border: 2px dashed #0d99ff;
  border-radius: 1rem;
  box-shadow: 4px 4px 20px 6px rgba(0,0,0,.2);
  margin:30px auto;
  padding:1.5rem;
  text-align: center;
`;

const Main = styled.div`
  display: grid;
  gap: 3rem;
  align-content:center;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  justify-content: center;
  // background: linear-gradient(180deg,#e4f1fb,hsla(0,0%,85.1%,0));
  margin-top: 20px;
  width:100%;
  padding: 1rem;
`;

const Text = styled.p`
font-size: .9rem;
color: #525c76;
line-height:1.rem;
margin: 3px;
`;

const Elipse = styled.div`
background-color:#dff3f9;
height: 100px;
width: 100px;
border-radius: 50%;
`;

const Card = styled.div`
padding: 1em;
border: 1px solid #e5e8eb;
gap: 2em;
margin: 10px auto;
border-radius: .7em;
`;

const ImageCard = styled.div`
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  height:100%;
  max-height:100%;
  width: 90%;
  max-width: 500px;
  border-radius: 1rem;
  &>img{
  object-fit: cover;
  width: 100%;
  height: 100%;
  }
`;

const Input = styled.input`
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
    border:1px solid #0d99ff;
  }
  ::placeholder {
    color: palevioletred;
  }
`;

const TextArea = styled.textarea`
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
    border:1px solid #0d99ff;
  }
`;

return (
  <>
    {!accountId && <p>Please sign in with NEAR wallet</p>}
    <Heading className="text-center fs-2 fw-bold">
      Mint NFT on Multiple chains
    </Heading>
    <Main className="container-fluid">
      {!state.image.cid ? (
        <div className="flex-grow-1">
          <Heading>
            Upload an image to create an NFT any of our supported blockchains
            super fast!
          </Heading>
          <ImageUploadCard className="flex-grow-1">
            <Elipse />
            <IpfsImageUpload
              image={state.image}
              className="btn text-decoration-none link-primary pe-auto"
            />
            <div>
              {
                //   <Heading
                //   onDrop={handleDrop}
                //   onDragOver={(event) => event.preventDefault()}
                // >
                //   Drag and Drop your image file here
                // </Heading>
              }
              <Text>
                We support .jpg, .jpeg, .png, .webp, .gif files and deploy to
                Celo, Algorand, Near, and Polygon
              </Text>
              <Text>Max file size: 20mb</Text>
            </div>
          </ImageUploadCard>
        </div>
      ) : (
        <>
          <Card className="d-flex flex-column align-items-center w-100">
            <div>
              <IpfsImageUpload
                image={state.image}
                className="btn btn-outline-primary border-0 rounded-3"
              />
            </div>
            <ImageCard>
              <img
                src={`https://ipfs.io/ipfs/` + state.image.cid}
                alt="uploaded image"
                width="100%"
                height="100%"
                className="rounded-3"
              />
            </ImageCard>
          </Card>
          <div>
            <Card>
              <Card>
                Title:
                <Input
                  type="text"
                  value={state.title || ""}
                  onChange={(e) => onChangeTitle(e.target.value)}
                />
              </Card>
              <Card>
                Description:
                <TextArea
                  type="text"
                  value={state.description || ""}
                  onChange={(e) => onChangeDesc(e.target.value)}
                />
              </Card>
            </Card>
            <Card>
              {state.sender && Ethers.provider() ? (
                <div className="form-group">
                  <label htmlFor="chainSelect">Select Chain</label>
                  <select
                    className="form-control"
                    value={state.selectedChain}
                    onChange={handleChainChange}
                  >
                    {chains.map((chain) => (
                      <option key={chain.id} value={chain.id}>
                        {chain.name}
                      </option>
                    ))}
                  </select>
                  {state.link && (
                    <a href={`${state.link}`} target="_blank">
                      View Transaction
                    </a>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={handleMint}
                  >
                    Mint to {contractAddresses[state.selectedChain][1]}
                  </button>
                </div>
              ) : state.sender ? (
                <div className="form-group">
                  <label htmlFor="chainSelect">Select Chain</label>
                  <select
                    className="form-control"
                    value={state.selectedChain}
                    onChange={handleChainChange}
                  >
                    {chains.map((chain) => (
                      <option key={chain.id} value={chain.id}>
                        {chain.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={handleMint}
                  >
                    Mint to {contractAddresses[state.selectedChain][1]}
                  </button>
                  <div>
                    <Web3Connect
                      className="btn mt-3"
                      connectLabel="Connect with Ethereum Wallet"
                    />
                  </div>
                </div>
              ) : (
                <Web3Connect
                  className="btn mt-3"
                  connectLabel="Connect with Wallet"
                />
              )}
            </Card>
          </div>
        </>
      )}
    </Main>
  </>
);
