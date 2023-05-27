const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;

const css = fetch(
  "https://nativonft.mypinata.cloud/ipfs/QmcMwXUUiiVUqr4eRV3w6gL76q6aY8vGQCNW9D3sMv2rsS"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
      font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      ${cssFont}
      ${css}
  `,
  });
}
const Theme = state.theme;
const RST_contract_mcbyte = "0xFD2Bd4a8C051fB2d9Aa05E3AED906514CCFaE3EA";
const RST_abi = fetch(
  "https://gateway.pinata.cloud/ipfs/QmTqkDGBsnMCBmBuBtyvG5NF4g6hwtMUUi5HizoNFL6agW"
);

if (!RST_abi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(RST_abi.body);

const trigger_bgreen = () => {
  console.log("trigger green clicked");

  const contract = new ethers.Contract(
    RST_contract_mcbyte,
    RST_abi.body,
    Ethers.provider().getSigner()
  );

  contract.walletOfOwner(state.sender).then((res) => {
    State.update({ lennfts: res });
  });

  if (state.lennfts.length < 2) {
    contract.mint().then((transactionHash) => {
      console.log("transactionHash is " + transactionHash);
      const contract = new ethers.Contract(
        RST_contract_mcbyte,
        RST_abi.body,
        Ethers.provider().getSigner()
      );
    });
  }
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

if (state.tasks === undefined && state.sender) {
  const contract = new ethers.Contract(
    RST_contract_mcbyte,
    RST_abi.body,
    Ethers.provider().getSigner()
  );

  contract.name().then((res) => {
    State.update({ name: res });
  });

  contract.symbol().then((res) => {
    State.update({ symbolx: res });
  });

  contract.ownerOf(1).then((res) => {
    State.update({ ownerOf: res });
  });

  contract.walletOfOwner(state.sender).then((res) => {
    State.update({ nfts: res });
  });

  contract.baseURI().then((res) => {
    State.update({ baseURI: res });
  });

  var nftsavailable = [];
  const getnftsres = state.nfts.map((data) => {
    const Numbx = parseInt(data._hex, 16);
    const cid_json = state.baseURI.split("ipfs://")[1];
    const urix_json = `https://ipfs.thirdwebcdn.com/ipfs/${cid_json}/${Numbx}.json`;
    const req_json = fetch(urix_json).body;
    const cid_img = req_json.image.split("ipfs://")[1];
    const img_form = `https://ipfs.thirdwebcdn.com/ipfs/${cid_img}`;

    var itemx = {
      name: req_json.name,
      description: req_json.description,
      image: img_form,
    };
    nftsavailable.push(itemx);
  });

  State.update({ nftsavailable: nftsavailable });
  console.log("nftsavailable");
  console.log(nftsavailable);
}

return (
  <Theme>
    <div class="LidoContainer">
      <div class="Header">Nfts disponibles</div>

      {!!state.sender ? (
        <>
          <div class="SubHeader">{state.sender} </div>
          <div class="rendernfts"></div>
          <button
            class="LidoStakeFormSubmitContainer"
            onClick={() => trigger_bgreen()}
          >
            <span>Mint 1 FREE</span>
          </button>
          <div>
            <div class=""> Max 2 mints per wallet </div>
            <div class="">Colection: {state.name} </div>
            <div class="">Symbol: {state.symbolx} </div>
            <div class="SubHeader">NFTS: {state.nfts.length} </div>
            <div>
              {state.nftsavailable.map((data) => {
                return (
                  <div class="boxg">
                    <h4>{data.name}</h4>
                    <img class="imgboxg" src={data.image} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <Web3Connect
          className="LidoStakeFormSubmitContainer"
          connectLabel="Connect with Web3"
        />
      )}
    </div>
  </Theme>
);
