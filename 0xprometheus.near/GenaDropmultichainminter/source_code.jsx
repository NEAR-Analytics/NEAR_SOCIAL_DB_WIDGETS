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
  137: [polygonContract, "Polygon"],
  1313161554: [auroraCOntract, "Aurora"],
  42220: [celoContract, "Celo"],
  43114: [avaxContract, "Avalanche"],
  42161: [arbitrumContract, "Arbitrum"],
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

  const CA = contractAddresses[state.selectedChain[0] || "137"];

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
    console.log("in the promise", res, Id);
    contract
      .mint(state.sender, Id, 1, `ipfs://${cid}`, "0x")
      .then((transactionHash) => transactionHash.wait())
      .then((ricit) => {
        console.log("receipt::", ricit);
      });
  });
};
if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  console.log("accounts:", accounts, Ethers.provider(), ethers);
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

return (
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
    <div className="flex-grow-1">
      <IpfsImageUpload
        image={state.image}
        className="btn btn-outline-secondary border-0 rounded-3"
      />
    </div>
    <div>
      {state.image.cid && (
        <div className="mt-3">
          <h5>Preview:</h5>
          <img
            src={`https://ipfs.io/ipfs/` + state.image.cid}
            alt="Preview"
            style={{ maxWidth: "300px" }}
          />
        </div>
      )}
    </div>
    <div>
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
        <Web3Connect className="btn mt-3" connectLabel="Connect with Wallet" />
      )}
    </div>
  </div>
);
