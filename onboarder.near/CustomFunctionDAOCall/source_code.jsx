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
  ft_token: "mear",
  price: 100000000000000000000000,
  valid_dao: true,
});

const onChangeDAO = (dao) => {
  State.update({
    dao,
  });
  onChangeValidDAO(dao);
};

const onChangeValidDAO = (dao_address) => {
  const valid_dao = dao_address.endsWith(".sputnik-dao.near");
  State.update({
    valid_dao,
  });
};

const onChangeNFTContract = (nft_contract_id) => {
  State.update({
    nft_contract_id,
  });
};

const onChangeMarketplace = (marketplace_address) => {
  State.marketplace_address({
    marketplace_address,
  });
};

const onChangeTokenID = (token_id) => {
  State.update({
    token_id,
  });
};

const onChangeGas = (gas) => {
  State.update({
    gas,
  });
};

const onChangePrice = (price) => {
  State.price({
    price,
  });
};
// is this different than price
const onChangeDeposit = (deposit) => {
  State.update({
    deposit,
  });
};

const onChangeDescription = (description) => {
  State.update({
    description,
  });
};

// const function_call_args;

//  function_call_args = json.dumps({
//   token_id: state.token_id,
//   nft_contract_id: state.nft_contract_id,
//   ft_token: "near",
//   price: state.price
// });

// add emcpded args // mob said to user bugger
// encode_function_args = base64.b64encode(bytes(function_call_args, "utf-8")).decode("utf-8");

// dao_args = json.dumps({
//   proposal: {
//     description: "Description",
//     kind: {
//       FunctionCall: {
//         receiver_id: contract_account_id,
//         actions: [
//           {
//             method_name: "method_name",
//             args: base64
//               .b64encode(bytes(function_call_args, "utf-8"))
//               .decode("utf-8"),
//             deposit: "1",no
//             gas: str(100 * 10 ** 12),
//           },
//         ],
//       },
//     },
//   },
// });

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

// should render nft
return (
  <div className="mb-3">
    <h1>💸 DAO Proposal Buy NFT on Paras</h1>
    DAO Address
    <input
      placeholder="onboarddao.sputnik-dao.near"
      onChange={(e) => onChangeDAO(e.target.value)}
    />
    {state.valid_dao && (
      <div className="alert alert-success" onClick={onChangeDAO(state.dao)}>
        <i className="bi bi-x"></i> DAO Address is valid
      </div>
    )}
    {!state.valid_dao && (
      <div className="alert alert-danger">
        <i className="bi bi-x"></i> DAO Address is invalid
      </div>
    )}
    <div className="row">
      <div className="col-lg-6 mb-2">
        NFT Contract ID:
        <input
          type="text"
          placeholder="x.paras.near"
          onChange={(e) => onChangeNFTContract(e.target.value)}
        />
      </div>
      <div className="col-lg-6 mb-2">
        Marketplace Address
        <input
          type="text"
          placeholder={marketplace_default}
          onChange={(e) => onChangeMarketplace(e.target.value)}
        />
      </div>
    </div>
    <div className="row">
      <div className="col-lg-6 mb-2">
        Token ID:
        <input
          type="text"
          placeholder="492017"
          onChange={(e) => onChangeTokenID(e.target.value)}
        />
      </div>
      <div className="col-lg-6 mb-2">
        tGas
        <input
          type="text"
          placeholder="200"
          onChange={(e) => onChangeGas(e.target.value * 1e12)}
        />
      </div>
    </div>
    <div className="row">
      <div className="col-lg-6 mb-2">
        Price (Offer)
        <input
          type="text"
          placeholder="0.1"
          onChange={(e) => onChangePrice(e.target.value * 1e24)}
        />
      </div>
      <div className="col-lg-6 mb-2">
        Deposit
        <input
          type="text"
          placeholder="0.1"
          onChange={(e) => onChangeDeposit(e.target.value * 1e24)}
        />
      </div>
    </div>
    <div className="mb-2">
      Description
      <textarea
        className="row col-lg-12 m-1 boder-light max-width form-control"
        placeholder="buying a nft on paras"
        onChange={(e) => onChangeDescription(e.target.value)}
      />
    </div>
    <button className="btn btn-primary mt-3" onClick={handleProposal}>
      Propose Buying NFT on {state.marketplace_address} for {state.dao}
    </button>
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle m-1"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        DAO Widgets
      </button>
      <ul class="dropdown-menu m-1" aria-labelledby="dropdownMenuButton1">
        <li>
          <a
            class="dropdown-item"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Add Member
          </a>
        </li>
        <li>
          <a
            class="dropdown-item"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            View DAO Members
          </a>
        </li>
        <li>
          <a
            class="dropdown-item"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            My DAOs
          </a>
        </li>
      </ul>
    </div>
  </div>
);
// should abstract dao widget directory in another widget
