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
const NEAR_NOMINATION_EXP = 24;
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
const trpMsg = JSON.stringify({
  price: amount,
  market_type: "sale",
  ft_token_id: "near",
});

const fnfMsg = JSON.stringify({
  sale_conditions: {
    near: amount,
  },
});
// need to find custom market link to work with

const nftMetadata = Near.view(contractId, "nft_metadata"); // get the contract name
const tokenInfo = Near.view(contractId, "nft_token", {
  token_id: tokenId,
});
console.log(tokenInfo.approved_account_ids);
initState({
  contractId: contractId,
  tokenId: tokenId,
  amount: amount,
  msg: msg,
  fnfMsg: fnfMsg,
  trpMsg: trpMsg,
  tradeportLink: tradeportLink,
  custom: false,
  customMarketLink: defaultCustomMarket,
  validMarketLink: true,
  nftMetadata: nftMetadata,
  tokenInfo: tokenInfo,
  receiverId: default_receiver,
  validReceiver: true,
  transfer: false, // add checkbox for transfer that shows
  url: image.url,
  nft: image.nft ?? {}, // from santiago
  showAlert: false,
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
function cleanupAmount(amount) {
  return amount.replace(/,/g, "").trim();
}
function trimLeadingZeroes(value) {
  value = value.replace(/^0+/, "");
  if (value === "") {
    return "0";
  }
  return value;
}
function parseNearAmount(amt) {
  if (!amt) {
    return null;
  }
  amt = cleanupAmount(amt);
  const split = amt.split(".");
  const wholePart = split[0];
  const fracPart = split[1] || "";
  if (split.length > 2 || fracPart.length > NEAR_NOMINATION_EXP) {
    throw new Error(`Cannot parse '${amt}' as NEAR amount`);
  }
  return trimLeadingZeroes(
    wholePart + fracPart.padEnd(NEAR_NOMINATION_EXP, "0")
  );
}
/*ON CHANGE FUNCTIONS - NEED TO FINISH NOT CONCATENATING*/
const onChangeAmount = (amount) => {
  amount = parseNearAmount(amount);
  console.log("parsed amount", amount);
  const msgConcat = JSON.stringify({
    price: amount,
    market_type: "sale",
    ft_token_id: "near",
  });
  const fnfMsg = JSON.stringify({
    sale_conditions: {
      near: amount,
    },
  });
  // console.log(bigIntNumber);
  console.log(amount);
  State.update({
    amount,
    msg: msgConcat,
    fnfMsg: fnfMsg,
    trpMsg: msgConcat,
  });
};

const onChangeMsg = (msg) => {
  // currently done in the amount
  State.update({
    msg: msg,
  });
};

const onChangeReceiver = (receiverId) => {
  const validReceiverLink = isNearAddress(receiverId[0]); // add error message or change button based on this
  State.update({
    receiverId: receiverId[0],
    validReceiver: validReceiverLink,
  });
  console.log(`receiver: ${state.receiverId[0]}`);
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
  console.log(state.trpMsg);
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
              msg: state.trpMsg,
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
              msg: state.fnfMsg,
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
if (!accountId) {
  State.update({
    showAlert: true,
    toastMessage: "Please Sign in to Near wallet to list",
  });
}
const selectCustom = () => {
  State.update({
    custom: !state.custom,
  });
}; // need better helper function for checking whether valid NEAR address
return (
  <div>
    {state.showAlert && (
      <Widget src="jgodwill.near/widget/genalert" props={state} />
    )}
    <h1 className="text-center"> 🛍️ List NFT to Multiple Marketplaces </h1>
    <div>
      <div
        className="p-2 rounded mt-3"
        style={{
          background: "#fdfdfd",
          border: "solid 1px #dee2e6",
          borderBottomLeftRadius: ".375rem",
          borderBottomRightRadius: ".375rem",
          minHeight: "9em",
        }}
      >
        <div>
          <div className="mt-2">
            <Widget
              src={`jgodwill.near/widget/genadrop-nft-selector`}
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
    {state.tokenId !== "1679119560198" && (
      <>
        <Widget
          src="jgodwill.near/widget/NftListingInput"
          props={{
            state,
            onChangeContract,
            onChangeToken,
            selectTradeport,
            selectFewFar,
            selectCustom,
            selectMintbase,
            onChangeCustomMarket,
            onChangeAmount,
            list,
            onChangeReceiver,
          }}
        />
        {/*<br></br>
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
        </div>*/}
      </>
    )}
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
  </div>
);
