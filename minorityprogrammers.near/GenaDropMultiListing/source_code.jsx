// NEED TO ADD CONDITIONALS FOR MARKETPLACE LISITNG AND FEW AND FAR, NEED TO FIX SCIENTIFIC NOTION ON PRICE //  ADD ERROR CHECKING for nft contract but preview is enough
// Define the NEAR amount to list at
const amount = "10000000000000000000000"; // 0.01 NEAR // maybe off
const accountId = context.accountId; // add check for context it

const nft = props.nft ?? {
  contractId: props.contractId,
  tokenId: props.tokenId,
};
const contractId = "genadrop-contract.nftgen.near"; // pass as
// error for serialization of reciever id, maybe need a buffer
const tokenId = "1679119560198"; // maybe condtional check if props is eempty
const fewfarmarket = "market.fewandfar.near";
const tradeportmarket = "market.tradeport.near";
const msg =
  '{"price":' +
  '"' +
  amount +
  '"' +
  ',"market_type":"sale","ft_token_id":"near"}';

initState({
  contractId: contractId,
  tokenId: tokenId,
  fewfar: false,
  tradeport: true,
  amount: amount,
  msg: msg,
});

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
  State.update({
    contractId,
  });
};

const onChangeToken = (tokenId) => {
  State.update({
    tokenId,
  });
};

// add conditions based on marketplace booleans
// improve this so it shows in same transaction
const list = () => {
  if (!accountId) {
    return;
  }
  // need to buffer serialize arguments, add helper functions with state arguments
  const gas = 100000000000000; // 100 tGas
  //   const deposit = 1; // exactly 1 yocto
  const deposit = 10000000000000000000000; // 0.01 near
  Near.call([
    {
      contractName: tradeportmarket,
      methodName: "storage_deposit",
      args: {
        receiver_id: context.accountId,
      },
      gas,
      deposit: deposit,
    },
    {
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

// nneed to add checkbox for which marketplaces
return (
  <div>
    <h1> 🛍️ List NFT to Multiple Marketplaces </h1>
    <h3>💧 by GenaDrop</h3>
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
    </div>
    <div className=" mb-2">
      Enter Price Your Want to List (In NEAR)
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
    <button className="btn btn-primary mt-3" onClick={list}>
      List
    </button>
    <Widget
      src="mob.near/widget/NftImage"
      props={{
        nft: { tokenId: state.tokenId, contractId: state.contractId },
        className: "img-fluid",
      }}
    />
  </div>
);
