// NEED TO FIX SCIENTIFIC NOTION ON PRICE //  ADD ERROR CHECKING for nft contract but preview is enough
// ERROR check if nft contracts or token exists by seeing if it becomes null with conditional error message
// name isnt updating correctly when contract changes and need to change
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
// fewfar link // display button if listed // asking them for format // https://fewfar.com/genadrop-single-nft-near/1675689302938/
const tradeportLink =
  "https://www.tradeport.xyz/near/collection/" + contractId + "/" + tokenId;
// maybe utilize the helper funciton here
// const fewfarlink =
const defaultCustomMarket = "apollo42.near";
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
console.log(tokenInfo);
// console.log(tokenInfo); // see whats inside
console.log(nftMetadata.name); // see whats inside // make an update method
// console.log(response);
initState({
  contractId: contractId,
  tokenId: tokenId,
  fewfar: false,
  tradeport: true,
  amount: amount,
  msg: msg,
  tradeportLink: tradeportLink,
  custom: false,
  customMarketLink: defaultCustomMarket,
  validMarketLink: true,
  nftMetadata: nftMetadata,
  tokenInfo: tokenInfo,
  ownsNFT: false, // change this and check intially
});
/**FINISH THIS - CHECK OWNERSHIP FUNCTION */
function ownsNFT() {
  const ownsNFT = context.accountId === state.tokenInfo.owner_id;

  // change this so it checks owner in metadata of nft in state
  console.log(state.tokenInfo.owner_id);
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
  console.log(state.tradeportLink);
}
/*ON CHANGE FUNCTIONS*/
const onChangeAmount = (amount) => {
  const msgConcat =
    '{"price":' +
    '"' +
    amount +
    '"' +
    ',"market_type":"sale","ft_token_id":"near"}';
  console.log(msgConcat);
  State.update({
    amount,
    msg: msgConcat,
  });
};

const onChangeMsg = () => {
  State.update({
    msg: msg,
  });
};

const onChangeContract = (contractId) => {
  const nftMetadata = Near.view(contractId, "nft_metadata"); // get the contract name
  State.update({
    contractId,
    nftMetadata,
  });
  onChangeToken(state.tokenId);
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

const onChangeCustomMarket = (customMarketLink) => {
  const validMarketLink = isNearAddress(customMarketLink);
  State.update({
    customMarketLink,
    validMarketLink,
  });
};

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

const list = () => {
  if (!accountId) {
    return;
  }
  // need to buffer serialize arguments, add helper functions with state arguments
  const gas = 100000000000000; // 100 tGas
  //   const deposit = 1; // exactly 1 yocto
  const deposit = 10000000000000000000000; // 0.01 near
  Near.call(
    [
      state.tradeport
        ? {
            contractName: tradeportmarket,
            methodName: "storage_deposit",
            args: {
              receiver_id: context.accountId,
            },
            gas,
            deposit: deposit,
          }
        : null,
      state.tradeport
        ? {
            contractName: state.contractId,
            // need to wrap first with near_deposit
            methodName: "nft_approve",
            args: {
              token_id: state.tokenId,
              account_id: tradeportmarket,
              msg: state.msg, // need to add the variables and buffer seerailize
            },
            gas: gas,
            deposit: deposit, // may take this out
          }
        : null,
      state.fewfar
        ? {
            contractName: fewfarmarket,
            methodName: "storage_deposit",
            args: {
              receiver_id: context.accountId,
            },
            gas,
            deposit: deposit,
          }
        : null,
      state.fewfar
        ? {
            contractName: state.contractId,
            // need to wrap first with near_deposit
            methodName: "nft_approve",
            args: {
              token_id: state.tokenId,
              account_id: fewfarmarket,
              msg: state.msg, // need to add the variables and buffer seerailize
            },
            gas: gas,
            deposit: deposit, // may take this out
          }
        : null,
      state.custom
        ? {
            contractName: state.customMarketLink,
            methodName: "storage_deposit",
            args: {
              receiver_id: context.accountId,
            },
            gas,
            deposit: deposit,
          }
        : null,
      state.custom
        ? {
            contractName: state.contractId,
            // need to wrap first with near_deposit
            methodName: "nft_approve",
            args: {
              token_id: state.tokenId,
              account_id: state.customMarketLink,
              msg: state.msg, // need to add the variables and buffer seerailize
            },
            gas: gas,
            deposit: deposit, // may take this out
          }
        : null,
    ].filter((entry) => entry !== null)
  );
};
const selectFewFar = () => {
  State.update({
    fewfar: !state.fewfar,
  });
};
const selectTradeport = () => {
  State.update({
    tradeport: !state.tradeport,
  });
};
const selectCustom = () => {
  State.update({
    custom: !state.custom,
  });
}; // need helper function for checking whether valid NEAR address

// nneed to add checkbox for which marketplaces
return (
  <div>
    <h1> 🛍️ List NFT to Multiple Marketplaces </h1>
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
    <div className="row">
      <div className="col-lg-6 mb-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={state.fewfar}
            onChange={selectFewFar}
            id="fewfarbox"
          />
          <label className="form-check-label" htmlFor="myCheckbox">
            List to Few and Far
          </label>
        </div>
      </div>
      <div className="col-lg-6 mb-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={state.tradeport}
            onChange={selectTradeport}
            id="tradeportbox"
          />
          <label className="form-check-label" htmlFor="myCheckbox">
            List to Tradeport
          </label>
        </div>
      </div>
      <div className="col-lg-6 mb-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={state.custom}
            onChange={selectCustom}
            id="custombox"
          />
          <label className="form-check-label" htmlFor="myCheckbox">
            Enter Custom Marketplace Address
          </label>
        </div>
      </div>
      {state.custom && (
        <div className="col-lg-6 mb-2">
          Custom Marketplace
          <input
            type="text"
            placeholder={state.customMarketLink}
            onChange={(e) => onChangeCustomMarket(e.target.value)}
          />
        </div>
      )}
    </div>
    {state.custom && !state.validMarketLink && (
      <div className="alert alert-danger">
        <i className="bi bi-x"></i> Not a Valid NEAR Contract for your custom
        Marketplace
      </div>
    )}
    <div className=" mb-2">
      Enter Price You Want to List (In NEAR) (WIP-Buggy)
      <input
        type="number"
        placeholder={state.amount / 1e24}
        onChange={(e) => onChangeAmount(e.target.value * 1e24)} // maybe 1e24 degen match
      />
      <p>
        * You will pay some gas in Ⓝ to deposit NEAR to marketplace address then
        list your NFT
      </p>
    </div>
    {state.ownsNFT && (
      <button className="btn btn-primary mt-3" onClick={list}>
        List
      </button>
    )}
    {!state.ownsNFT && (
      <button className="btn btn-secondary mt-3">
        You Can Only List An NFT You Own
      </button>
    )}

    <a
      href={state.tradeportLink}
      target="_blank"
      rel="noopener noreferrer"
      class="btn btn-secondary mt-3"
    >
      View on Tradeport
    </a>
    <div className="border border-secondary rounded col-lg-6 p-1 m-1">
      <h1>🖼️ NFT Details</h1>
      <p>Collection Name: </p>
      <h3 className="">{state.nftMetadata.name}</h3>
      {!state.ownsNFT && (
        <div className="alert alert-danger">
          <i className="bi bi-x"></i> You do not own this NFT & cannot list it
          Marketplace
        </div>
      )}
      {state.ownsNFT && (
        <div className="alert alert-success">
          <i className="bi bi-x"></i> You own this NFT
        </div>
      )}
      <p>NFT Name: </p>
      <h4 className="">{state.tokenInfo.metadata.title}</h4>
      <p className="">Description: {state.tokenInfo.metadata.description}</p>
      <p>
        <a href={state.tokenInfo.media} target="_blank">
          {state.tokenInfo.media}
        </a>
      </p>
      <Widget
        src="mob.near/widget/NftImage"
        props={{
          nft: { tokenId: state.tokenId, contractId: state.contractId },
          className: "col-lg-12",
        }}
      />
    </div>
    <h1>Marketplaces this NFT is Already Listed On (Not Ready)</h1>
    <p>Need to check which marketplaces have been approved on this nft</p>
    <br></br>
    <Widget
      src="minorityprogrammers.near/widget/genadropMinter"
      props={{ authors: [ownerId], dep: true }}
    />
  </div>
);

// TODO: Only listing to marketplaces (already listed) to marketplaces that this nft hasnt been listed on
// add buttons to links in the marketplaces if they have been listed
// add mint to genadrop
// add ability to list on different marketplaces to different pirces
// add conditional for not being able to list if their is invalid custom maretkpalce trying to list to or invalid anything
