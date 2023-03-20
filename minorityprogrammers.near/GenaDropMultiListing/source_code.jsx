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
const defaultCustomMarket = "apollo42.near";
const mintbasemarket = "simple.market.mintbase1.near";
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
  fewfar: false,
  tradeport: false,
  mintbase: false,
  amount: amount,
  msg: msg,
  tradeportLink: tradeportLink,
  custom: false,
  customMarketLink: defaultCustomMarket,
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
  const ownsNFT = context.accountId === state.tokenInfo.owner_id;
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
const onChangeAmount = (amount) => {
  const scientificNotationNumber = "1.23e+7";

  const [mantissa, exponent] = scientificNotationNumber.split("e+");
  const [integerPart, fractionalPart] = mantissa.split(".");

  let result = parseInt(integerPart);
  console.log(result); // Output: "12300000"

  if (fractionalPart) {
    let fractionalValue = parseInt(fractionalPart);
    for (let i = 0; i < exponent; i++) {
      fractionalValue *= 10;
    }
    for (let i = 0; i < exponent; i++) {
      result *= 10;
    }
    result += fractionalValue;
  } else {
    for (let i = 0; i < exponent; i++) {
      result *= 10;
    }
  }

  const bigIntNumberString = result.toString();
  console.log(bigIntNumberString); // Output: "12300000"

  const msgConcat =
    '{"price":' +
    '"' +
    amount +
    '"' +
    ',"market_type":"sale","ft_token_id":"near"}';
  // console.log(bigIntNumber);
  console.log(amount);
  State.update({
    amount,
    msg: msgConcat,
  });
};

const onChangeMsg = (msg) => {
  // currently done in the amount
  State.update({
    msg: msg,
  });
};

const onChangeReceiver = (receiverId) => {
  const validReceiverLink = isNearAddress(receiverId); // add error message or change button based on this
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
    console.log("Sign in to list");
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
              msg: state.msg,
            },
            gas: gas,
            deposit: deposit,
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
              msg: state.msg,
            },
            gas: gas,
            deposit: deposit,
          }
        : null,
      state.mintbase
        ? {
            contractName: mintbasemarket,
            methodName: "storage_deposit",
            args: {
              receiver_id: context.accountId,
            },
            gas,
            deposit: deposit,
          }
        : null,
      state.mintbase
        ? {
            contractName: state.contractId,
            // need to wrap first with near_deposit
            methodName: "nft_approve",
            args: {
              token_id: state.tokenId,
              account_id: mintbasemarket,
              msg: state.msg, // need to change mesg to conform with mitnbase market // "{\"price\":\"3900000000000000000000000\",\"autotransfer\":true}"
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
const selectMintbase = () => {
  State.update({
    mintbase: !state.mintbase,
  });
};
const selectCustom = () => {
  State.update({
    custom: !state.custom,
  });
}; // need better helper function for checking whether valid NEAR address
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
      {false && (
        <div className="col-lg-6 mb-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={state.mintbase}
              onChange={selectMintbase}
              id="mintbasebox"
            />
            <label className="form-check-label" htmlFor="myCheckbox">
              List to Mintbase
            </label>
          </div>
        </div>
      )}
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
        onChange={(e) => onChangeAmount(e.target.value * 1e24)}
      />
      <p>
        * You will pay some gas in Ⓝ to deposit NEAR to marketplace address then
        list your NFT
      </p>
    </div>
    <div className="row text-center">
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
        class="btn btn-dark mt-3"
      >
        View on Tradeport
      </a>
    </div>
    <br></br>
    <h1 className="text-center">OR</h1>
    <h2 className="text-center">Transfer</h2>
    <div className=" mb-2">
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
    <div className="row">
      <div className="col-lg-6 border border-secondary rounded">
        <p>
          Collection Name:{" "}
          <span className="font-weight-bold">{state.nftMetadata.name}</span>
        </p>
        <p>
          NFT Name: <span className="">{state.tokenInfo.metadata.title}</span>
        </p>
        <p className="">Description: {state.tokenInfo.metadata.description}</p>
        <p>
          <a href={state.tokenInfo.media} target="_blank">
            {state.tokenInfo.media}
          </a>
        </p>
        {!state.ownsNFT && (
          <div className="alert alert-danger">
            <i className="bi bi-x"></i> You do not own this NFT & cannot list or
            transfer it
          </div>
        )}
        {state.ownsNFT && (
          <div className="alert alert-success">
            <i className="bi bi-x"></i> You own this NFT
          </div>
        )}
        <Widget
          src="mob.near/widget/NftImage"
          props={{
            nft: { tokenId: state.tokenId, contractId: state.contractId },
            className: "col-lg-12",
          }}
        />
        <div className="col-lg-12">
          <h3> Listed Markets</h3>
          <div>
            {typeof state.tokenInfo.approved_account_ids === "object" &&
              Object.keys(state.tokenInfo.approved_account_ids).map((key) => (
                <p>
                  <a
                    href={"https://explorer.near.org/accounts/" + key}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {key}: {state.tokenInfo.approved_account_ids[key]}
                  </a>
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <Widget
          src="minorityprogrammers.near/widget/genadropMinter"
          props={{ authors: [ownerId], dep: true }}
        />
      </div>
    </div>
  </div>
);

// TODO: Only listing to marketplaces (already listed) to marketplaces that this nft hasnt been listed on
// add buttons to links in the marketplaces if they have been listed
// add ability to list on different marketplaces at different price
// add conditional for not being able to list if their is invalid custom maretkpalce trying to list to or invalid anything
