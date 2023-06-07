const auroraCOntract = "0xe53bC42B6b25a1d548B73636777a0599Fd27fE5c";
const polygonContract = "0x436AEceaEeC57b38a17Ebe71154832fB0fAFF878";
const celoContract = "0xC291846A587cf00a7CC4AF0bc4EEdbC9c3340C36";
const avaxContract = "0x43dBdfcAADD0Ea7aD037e8d35FDD7c353B5B435b";
const arbitrumContract = "0x959a2945185Ec975561Ac0d0b23F03Ed1b267925";
const nearContract = "nft.genadrop.near";
const ownerId = "minorityprogrammers.near"; // attribution
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
    url: "https://ipfs.near.social/ipfs/bafkreie5h5oq6suoingcwuzj32m3apv56rl56wpwpaxmevlk5vndlypxze",
  },
  {
    id: "1313161554",
    name: "Aurora",
    url: "https://ipfs.near.social/ipfs/bafkreiajqik4gjbmkh7z2gylpjzrsuht7simjecpxuoqn6icqfbioswzuy",
  },
  {
    id: "42220",
    name: "Celo",
    url: "https://ipfs.near.social/ipfs/bafkreifu6ufsdf2ivrs5febt7l25wdys6odzfelgjauzod7owrfug56cxe",
  },
  {
    id: "43114",
    name: "Avax",
    url: "https://ipfs.near.social/ipfs/bafkreifhu5fytsjcmjluarfnu6kcdhaqz4rgdrbbzf6dlsmggqb7oi3w4e",
  },
  {
    id: "42161",
    name: "Arbitrum",
    url: "https://ipfs.near.social/ipfs/bafkreiffax4lnya337rz5ph75faondeqmpy6xj37yprwvxbru4qc5emsiq",
  },
  {
    id: "0",
    name: "Near",
    url: "https://ipfs.near.social/ipfs/bafkreigv55ubnx3tfhbf56toihekuxvgzfqn5c3ndbfjcg3e4uvaeuy5cm",
  },
];

const handleMint = () => {
  console.log("it's here", state.title && state.description && state.image.cid);
  if (!state.image.cid) {
    return;
  }
  if (!state.title) {
    console.log("Please Enter title");
    State.update({
      showAlert: true,
      toastMessage: "Please enter a title for the NFT",
    });

    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
  } else if (!state.description) {
    State.update({
      showAlert: true,
      toastMessage: "Please enter a description for the NFT",
    });
    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
  } else {
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
              receiver_id: state.recipient || accountId,
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
        .mint(state.recipient || recipient[0], Id, 1, `ipfs://${cid}`, "0x")
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
  }
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

  State.update({
    selectedChain: "0",
  });
}
State.init({
  title: "",
  description: "",
  recipient: "",
  showAlert: false,
  toastMessage: "",
  selectIsOpen: false,
});

//select tag
const handleSelectClick = () => {
  State.update({
    selectIsOpen: !state.selectIsOpen,
  });
};

// const handleOptionClick = (option) => {
//   setSelectedOption(option);
//   setIsOpen(false);
// };

const handleOutsideClick = (e) => {
  if (!e.target.closest(".select-replica__select")) {
    State.update({
      selectIsOpen: false,
    });
  }
};

const onChangeTitle = (title) => {
  console.log("go daddy", state.recipient);
  State.update({
    title,
  });
};

const data = Social.keys("*/profile", "final");

if (!data) {
  return "Loading";
}

const accounts = Object.entries(data);

const allWidgets = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];
  allWidgets.push(accountId);
}

const onChangeRecipient = (recipient) => {
  state.selectedChain === "0"
    ? State.update({
        recipient: recipient[0],
      })
    : State.update({
        recipient,
      });
};

const handleChainChange = (chain_id) => {
  console.log(
    "get what we doing:",
    chain_id || "no value from event?",
    chain_id == "0",
    !accountId
  );
  if (chain_id == "0") {
    if (!accountId) {
      console.log("not what we thought,:", accountId);
      State.update({
        showAlert: true,
        toastMessage: "Please log in before continuing",
      });
      return;
    }
    State.update({
      selectedChain: chain_id,
    });
  }
  console.log("encts here", Ethers.send);
  Ethers.send("wallet_switchEthereumChain", [
    {
      chainId: "0x" + Number(chain_id).toString(16),
    },
  ]).then((data) => console.log("done!!!", data));
  console.log("what happens after");
  State.update({
    selectedChain: chain_id,
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
  margin: 3px auto 3px auto;
  font-size: 1em;
  color:#0f1d40;
  line-height:2.1rem;
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
  margin-top: 5px;
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
& input{
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
  box-shadow:none;
    border:1px solid #0d99ff;
  }
  &::placeholder {
    color: palevioletred;
  }
  }
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

const SelectTag = styled.select`
  height: fit-content;
  width: 300px;
`;

const ChainIcon = styled.option`
  display: flex;
  height: 130px;
  padding: 1rem auto;
  &>img{
    height:100px;
    width: 100px;
    object-fit: contain;
  }
`;

const SelectReplicaContainer = styled.div`
  position: relative;
  display: inline-block;
  background-color: #fff;
  z-index: 1;
  & .select-replica__select {
    position: relative;
  }

  & .select-replica__selected {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: 3px;
    border: 1px solid #ccc;
    gap: 10px;
    border-radius: 4px;
    background-color: #fff;
    width: 200px;
    & > img {
      height: 100%;
      width: 100px;
      object-fit: contain;
    }
  }

  & .select-replica__options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    /* height: fit-content; */
    overflow-y: auto;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    background-color: #fff;
    max-height: 250px;
    display: none;
  }

  & .select-replica__options.open {
    display: block;
  }

  & .select-replica__option {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #fff;
    padding: 3px;
    border-bottom: 1px solid gray;
  }

  & .select-replica__option.selected {
    background-color: #f0f0f0;
  }

  & .select-replica__option img {
    height: 60px;
    width: 100px;
    object-fit: contain;
  }
`;

if (!(state.sender || accountId)) {
  console.log("Please login here now");
  State.update({
    showAlert: true,
    toastMessage: "Please Sign in or connect a wallet",
  });
}

console.log(
  "Here 🤔 " +
    chains.filter((chain) => chain.id === state.selectedChain).map((c) => c.url)
);

return (
  <>
    {state.showAlert && (
      <Widget src="jgodwill.near/widget/genalert" props={state} />
    )}
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
              {state.sender && Ethers.provider() ? (
                <div className="form-group">
                  <label htmlFor="chainSelect">Select Chain</label>
                  {/*<select
                    className="form-select"
                    value={state.selectedChain}
                    onChange={handleChainChange}
                  >
                    {chains.map((chain) => (
                      <ChainIcon key={chain.id} value={chain.id}>
                        {chain.name}
                      </ChainIcon>
                    ))}
                  </select>*/}
                  <SelectReplicaContainer onClick={handleOutsideClick}>
                    <div
                      className={`select-replica__select ${
                        state.selectIsOpen ? "open" : ""
                      }`}
                      onClick={handleSelectClick}
                    >
                      <div className="select-replica__selected">
                        {state.selectedChain ? (
                          <img
                            src={chains
                              .filter(
                                (chain) => chain.id === state.selectedChain
                              )
                              .map((c) => c.url)}
                            alt={
                              chains
                                .filter(
                                  (chain) => chain.id === state.selectedChain
                                )
                                .map((c) => c.name) || "No value?"
                            }
                          />
                        ) : (
                          "Select an option"
                        )}
                        <span>🔻</span>
                      </div>
                      <div
                        className={`select-replica__options ${
                          state.selectIsOpen ? "open" : ""
                        }`}
                      >
                        {chains.map((chain) => (
                          <div
                            key={chain.id}
                            className={`select-replica__option ${
                              selectedOption === chain.name ? "selected" : ""
                            }`}
                            onClick={() => handleChainChange(chain.id)}
                          >
                            <img src={chain.url} alt={chain.name} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </SelectReplicaContainer>
                  {state.link && (
                    <a href={`${state.link}`} target="_blank">
                      View Transaction
                    </a>
                  )}
                </div>
              ) : accountId ? (
                <div>
                  <label htmlFor="chainSelect">Select Chain</label>
                  {/*<SelectTag
                    className="form-select"
                    value={state.selectedChain}
                    onChange={handleChainChange}
                  >
                    <option disabled selected>
                      Select a Chain
                    </option>
                    {chains.map((chain) => (
                      <ChainIcon key={chain.id} value={chain.id}>
                        <span>{chain.name}</span>
                      </ChainIcon>
                    ))}
                  </SelectTag>*/}
                  <SelectReplicaContainer onClick={handleOutsideClick}>
                    <div
                      className={`select-replica__select ${
                        state.selectIsOpen ? "open" : ""
                      }`}
                      onClick={handleSelectClick}
                    >
                      <div className="select-replica__selected">
                        {state.selectedChain ? (
                          <img
                            src={chains
                              .filter(
                                (chain) => chain.id === state.selectedChain
                              )
                              .map((c) => c.url)}
                            alt={chains
                              .filter(
                                (chain) => chain.id === state.selectedChain
                              )
                              .map((c) => c.name)}
                          />
                        ) : (
                          "Select an option"
                        )}
                        <span>🔻</span>
                      </div>
                      <div
                        className={`select-replica__options ${
                          state.selectIsOpen ? "open" : ""
                        }`}
                      >
                        {chains.map((chain) => (
                          <div
                            key={chain.id}
                            className={`select-replica__option ${
                              selectedOption === chain.name ? "selected" : ""
                            }`}
                            onClick={() => handleChainChange(chain.id)}
                          >
                            <img src={chain.url} alt={chain.name} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </SelectReplicaContainer>
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
              <Card>
                Mint To:
                {state.selectedChain !== "0" ? (
                  <Input
                    type="text"
                    placeholder={
                      state.selectedChain == "0" ? accountId : state.sender
                    }
                    value={state.recipient}
                    onChange={(e) => onChangeRecipient(e.target.value)}
                  />
                ) : (
                  <Typeahead
                    id="async-example"
                    className="type-ahead"
                    isLoading={isLoading}
                    labelKey="search"
                    minLength={1}
                    options={allWidgets}
                    onChange={(value) => onChangeRecipient(value)}
                    placeholder={
                      state.selectedChain == "0" ? accountId : state.sender
                    }
                  />
                )}
              </Card>
            </Card>
            <button
              type="button"
              className="btn btn-primary d-flex flex-column align-items-center mx-auto"
              onClick={handleMint}
            >
              Mint to {contractAddresses[state.selectedChain][1]}
            </button>
          </div>
        </>
      )}
    </Main>
    <h4 className="text-center mt-5">
      💧
      <a href="https://genadrop.io" target="_blank" rel="noopener noreferrer">
        GenaDrop
      </a>
      <Widget
        src="miraclx.near/widget/Attribution"
        props={{ authors: [ownerId], dep: true }}
      />
    </h4>
  </>
);
