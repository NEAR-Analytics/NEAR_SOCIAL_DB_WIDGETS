const accountId = props.accountId ?? context.accountId;
// error check for DAO ends with .sputnik-dao.near
const default_dao = "onboarddao.sputnik-dao.near";
const marketplace_default = "marketplace.paras.near";
if (!accountId) {
  return "Please connect your NEAR wallet :)";
} // should add a shard dog link here

State.init({
  dao: default_dao,
  marketplace_address: marketplace_default,
});

const onChangeGas = (gas) => {
  State.update({
    gas,
  });
};
// is this different than price
const onChangeDeposit = (deposit) => {
  State.update({
    deposit,
  });
};

const onChangeMarketplace = (marketplace_address) => {
  State.marketplace_address({
    marketplace_address,
  });
};

const onChangeDescription = (description) => {
  State.update({
    description,
  });
};

const handleProposal = () => {
  Near.call([
    {
      contractName: state.dao ?? default_dao,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: state.description,
          kind: {
            FunctionCall: {
              marketplace_address:
                state.marketplace_address ?? marketplace_default,
            },
          },
        },
      },
      gas: state.gas ?? 200000000000000,
      deposit: state.deposit ?? 100000000000000000000000,
    },
  ]);
};

const onChangeNFTContract = (nft_contract_id) => {
  State.update({
    nft_contract_id,
  });
};
const onChangeTokenID = (token_id) => {
  State.update({
    token_id,
  });
};
const onChangeDAO = (dao) => {
  State.update({
    dao,
  });
};
// should render nft
return (
  <div className="mb-3">
    <h1>💸 DAO Proposal Buy NFT on Paras</h1>
    DAO Address
    <input
      placeholder="onboarddao.sputnik-dao.near"
      onChange={(e) => onChangeDAO(e.target.value)}
    />
    <div className="mb-2">
      NFT Contract ID:
      <input
        type="text"
        placeholder="x.paras.near"
        onChange={(e) => onChangeNFTContract(e.target.value)}
      />
    </div>
    <div className="mb-2">
      Token ID:
      <input
        type="text"
        placeholder="492017"
        onChange={(e) => onChangeTokenID(e.target.value)}
      />
    </div>
    <div className="mb-2">
      tGas
      <input
        type="text"
        placeholder="200"
        onChange={(e) => onChangeGas(e.target.value * 1e12)}
      />
    </div>
    <div className="mb-2">
      Deposit
      <input
        type="text"
        placeholder="0.1"
        onChange={(e) => onChangeDeposit(e.target.value * 1e24)}
      />
    </div>
    <div className="mb-2">
      Description
      <input
        type="text"
        placeholder="buying a nft on paras"
        onChange={(e) => onChangeDescription(e.target.value)}
      />
    </div>
    <div className="mb-2">
      Marketplace Address
      <input
        type="text"
        placeholder={marketplace_default}
        onChange={(e) => onChangeMarketplace(e.target.value)}
      />
    </div>
    <button className="btn btn-primary mt-3" onClick={handleProposal}>
      Propose Buying NFT on {state.marketplace_address} for {state.dao}
    </button>
  </div>
);
