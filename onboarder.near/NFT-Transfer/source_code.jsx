// add nft transfers here
// NEED TO FIX SCIENTIFIC NOTION ON PRICE //  ADD ERROR CHECKING for nft contract but preview is enough
const image = props.image;
const onChange = props.onChange;
const amount = "10000000000000000000000"; // 0.01 NEAR // amount to list at, by default its for other marketplaces
const accountId = context.accountId; // add check for context it
const ownerId = "minorityprogrammers.near"; // attribution
const nft = props.nft ?? {
  contractId: props.contractId,
  tokenId: props.tokenId,
}; // just in case need to pass in a NFT
const contractId = "genadrop-contract.nftgen.near"; // default nft contract
const tokenId = "1679119560198"; // maybe condtional check if props is eempty // default nft
const fewfarmarket = "market.fewandfar.near";
const tradeportmarket = "market.tradeport.near";
// fewfar link // display button if listed // asking them for format and they are working on a fix // https://fewfar.com/genadrop-single-nft-near/1675689302938/
const tradeportLink =
  "https://www.tradeport.xyz/near/collection/" + contractId + "/" + tokenId;
// maybe utilize the helper funciton here
// const fewfarlink =
const default_receiver = "minorityprogrammers.near"; // default reciver nft for transfers
const msg =
  '{"price":' +
  '"' +
  amount +
  '"' +
  ',"market_type":"sale","ft_token_id":"near"}';
// need to find custom market link to work with

const nftMetadata = Near.view(contractId, "nft_metadata"); // get the contract name
const tokenInfo = Near.view(contractId, "nft_token", {
  token_id: tokenId,
});
console.log(tokenInfo.approved_account_ids);
initState({
  contractId: contractId,
  tokenId: tokenId,
  tradeportLink: tradeportLink,
  validMarketLink: true,
  nftMetadata: nftMetadata,
  tokenInfo: tokenInfo,
  receiverId: default_receiver,
  validReceiver: true,
  ownsNFT: false, // change this and check intially
  transfer: false, // add checkbox for transfer that shows
  url: image.url,
  nft: image.nft ?? {}, // from santiago
});
function ownsNFT() {
  const ownsNFT = accountId === state.tokenInfo.owner_id;
  State.update({
    ownsNFT: ownsNFT,
  });
}
ownsNFT();
function updateTradeportLink() {
  // Function body goes here
  const updatedLink =
    "https://www.tradeport.xyz/near/collection/" +
    state.contractId +
    "/" +
    state.tokenId;
  State.update({
    tradeportLink: updatedLink,
  });
}
/*ON CHANGE FUNCTIONS - NEED TO FINISH NOT CONCATENATING*/

const onChangeReceiver = (receiverId) => {
  const validReceiverLink = isNearAddress(receiverId); // add error message or change button based on this
  ownsNFT();
  State.update({
    receiverId,
    validReceiver: validReceiverLink,
  });
};

const onChangeContract = (contractId) => {
  const nftMetadata = Near.view(contractId, "nft_metadata"); // get the contract name
  State.update({
    contractId,
    nftMetadata,
  });
  onChangeToken(state.tokenId); // this doesnt change the token
  ownsNFT();
  updateTradeportLink();
};

const onChangeToken = (tokenId) => {
  const tokenInfo = Near.view(state.contractId, "nft_token", {
    token_id: tokenId,
  });
  State.update({
    tokenId,
    tokenInfo,
  });
  ownsNFT();
  updateTradeportLink();
};
// finish this statement
const updateLink = () => {
  if (state.contractId && state.tokenId) {
  }
};
/* HELPER FUNCTION */
function isNearAddress(address) {
  if (typeof address !== "string") {
    return false;
  }
  if (!address.endsWith(".near")) {
    return false;
  }
  const parts = address.split(".");
  if (parts.length !== 2) {
    return false;
  }
  if (parts[0].length < 2 || parts[0].length > 32) {
    return false;
  }
  if (!/^[a-z0-9_-]+$/i.test(parts[0])) {
    return false;
  }
  return true;
}

const transfer = () => {
  if (!accountId) {
    return;
  }
  // need to buffer serialize arguments, add helper functions with state arguments
  const gas = 100000000000000; // 100 tGas
  //   const deposit = 1; // exactly 1 yocto
  const deposit = 1; // 0.01 near // maybe less
  Near.call([
    {
      contractName: state.contractId,
      methodName: "nft_transfer",
      args: {
        receiver_id: state.receiverId,
        token_id: state.tokenId,
      },
      gas: gas ?? 200000000000000,
      deposit: deposit ?? 10000000000000000000000,
    },
  ]);
};
return (
  <div>
    <h1> 🛍️ Transfer NFT </h1>
    <h3>
      💧
      <a href="https://genadrop.io" target="_blank" rel="noopener noreferrer">
        GenaDrop
      </a>
      <Widget
        src="miraclx.near/widget/Attribution"
        props={{ authors: [ownerId], dep: true }}
      />
    </h3>
    <div>
      <div
        className="p-2"
        style={{
          background: "#fdfdfd",
          border: "solid 1px #dee2e6",
          borderTop: 0,
          borderBottomLeftRadius: ".375rem",
          borderBottomRightRadius: ".375rem",
          minHeight: "9em",
        }}
      >
        <div>
          <div className="mt-2">
            <Widget
              src={`sainthiago.near/widget/nft-selector`}
              props={{
                onChange: ({ contractId, tokenId }) => {
                  State.update({
                    contractId: contractId,
                    tokenId: tokenId,
                  });
                  onChangeToken(tokenId);
                  onChangeContract(contractId);
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-6 mb-2">
        ContractID
        <input
          type="text"
          placeholder={state.contractId}
          onChange={(e) => onChangeContract(e.target.value)}
        />
      </div>
      <div className="col-lg-6 mb-2">
        Token ID
        <input
          type="text"
          placeholder={state.tokenId}
          onChange={(e) => onChangeToken(e.target.value)}
        />
      </div>
    </div>
    <div className="mb-2">
      Receiver Address
      <input
        type="text"
        placeholder={state.receiverId}
        onChange={(e) => onChangeReceiver(e.target.value)}
      />
    </div>
    <div className="row">
      {state.ownsNFT && state.validReceiver && (
        <button className="btn btn-primary mt-3" onClick={transfer}>
          Transfer
        </button>
      )}
      <div className="col-lg-6"></div>
      {state.ownsNFT && !state.validReceiver && (
        <button className="btn btn-warning mt-3">
          Can't Transfer (Invalid Receiver)
        </button>
      )}
      {!state.ownsNFT && state.validReceiver && (
        <button className="btn btn-danger mt-3">
          Can't Transfer (Don't Own)
        </button>
      )}
    </div>
    <a
      href={state.tradeportLink}
      target="_blank"
      rel="noopener noreferrer"
      className="col-lg-12 btn btn-dark mt-3 text-align align-center"
    >
      View on Tradeport
    </a>
  </div>
);

// TODO: Only listing to marketplaces (already listed) to marketplaces that this nft hasnt been listed on
// add buttons to links in the marketplaces if they have been listed
// add ability to list on different marketplaces at different price
// add conditional for not being able to list if their is invalid custom maretkpalce trying to list to or invalid anything
