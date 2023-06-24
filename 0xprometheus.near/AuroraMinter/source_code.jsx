const auroraCOntract = "0xe53bC42B6b25a1d548B73636777a0599Fd27fE5c";
const ownerId = "0xprometheus.near"; // attribution
const mintSingle = [
  "function mint(address to, uint256 id, uint256 amount, string memory uri, bytes memory data) public {}",
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
    console.log("passed checks");
    let networkId = Ethers.provider()._network.chainId;

    const contract = new ethers.Contract(
      auroraCOntract,
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
              "https://explorer.aurora.dev/tx/" + ricit.transactionHash
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
});
const onChangeTitle = (title) => {
  console.log("go daddy", state.recipient);
  State.update({
    title,
  });
};

const onChangeRecipient = (recipient) => {
  State.update({
    recipient,
  });
};

const handleChainChange = (event) => {
  console.log(
    "get what we doing:",
    event.target.value || "no value from event?",
    event.target.value == "0",
    !accountId
  );
  if (event.target.value == "0") {
    if (!accountId) {
      console.log("not what we thought,:", accountId);
      State.update({
        showAlert: true,
        toastMessage: "Please log in before continuing",
      });
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

return (
  <>
    {state.showAlert && (
      <Widget src="jgodwill.near/widget/genalert" props={state} />
    )}
    <Heading className="text-center fs-2 fw-bold">Mint NFT on Aurora</Heading>
    <Main className="container-fluid">
      <>
        <Card className="d-flex flex-column align-items-center w-100">
          <div>
            <IpfsImageUpload
              image={state.image}
              className="btn btn-outline-primary border-0 rounded-3"
            />
          </div>
          {state.image.cid && (
            <ImageCard>
              <img
                src={`https://ipfs.io/ipfs/` + state.image.cid}
                alt="uploaded image"
                width="100%"
                height="100%"
                className="rounded-3"
              />
            </ImageCard>
          )}
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
            <Card>
              Mint To:
              <Input
                type="text"
                placeholder={
                  state.selectedChain == "0" ? accountId : state.sender
                }
                value={state.recipient}
                onChange={(e) => onChangeRecipient(e.target.value)}
              />
            </Card>
            {state.link && (
              <Card>
                <p>Minting Successful:</p>
                <a href={`${state.link}`} target="_blank">
                  View Transaction
                </a>
              </Card>
            )}
          </Card>
          {state.sender ? (
            <button
              type="button"
              className="btn btn-primary d-flex flex-column align-items-center mx-auto"
              onClick={handleMint}
            >
              Mint
            </button>
          ) : (
            <Web3Connect
              className="btn mt-3"
              connectLabel="Connect with Wallet"
            />
          )}
        </div>
      </>
    </Main>
    <h4 className="text-center mt-5">
      💧
      <a
        href="https://encodeclub.notion.site/NEAR-Protocol-Bounty-10978898e68b41698df836b6dfd9b60b"
        target="_blank"
        rel="noopener noreferrer"
      >
        Aurora Hackathon Project
      </a>
      <Widget
        src="miraclx.near/widget/Attribution"
        props={{ authors: [ownerId], dep: true }}
      />
    </h4>
  </>
);
