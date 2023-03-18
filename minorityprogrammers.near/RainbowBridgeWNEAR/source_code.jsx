// Define the NEAR account and amount to bridge
const amount = "10000000000000000000000"; // 0.01 NEAR // maybe off
// Define the Aurora address to receive the bridged NEAR
const accountId = context.accountId; // add check for context it

const method_name = "ft_transfer_call";
const receiver_id = "aurora";

const contract_name = "wrap.near";

const auroraAddress = "0x97B882530830a10f07A9f9A733cB7d0491F808Dc"; // minority programmersEth address

initState({
  amount: amount,
  ethereum_receiver: auroraAddress,
});
// Define the Rainbow Bridge API endpoint
const bridgeEndpoint = "https://bridge-api.mainnet.near.org";

const onChangeAddress = (ethereum_receiver) => {
  State.update({
    ethereum_receiver,
  });
}; // add helper function for proper ethereum addresses

const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};

// improve this so it shows in same transaction

const bridge = () => {
  if (!(accountId && state.amount && state.ethereum_receiver)) {
    return;
  }

  const gas = 200000000000000;
  const deposit = 1; // exactly 1 yocto
  Near.call([
    {
      contractName: "wrap.near",
      methodName: "near_deposit",
      args: {},
      gas,
      deposit: state.amount,
    },
    {
      contractName: contract_name,
      // need to wrap first with near_deposit
      methodName: "ft_transfer_call",
      args: {
        receiver_id: "aurora",
        amount: state.amount,
        memo: null,
        msg: state.ethereum_receiver,
        //   msg: "0x97B882530830a10f07A9f9A733cB7d0491F808Dc",
      },
      gas: gas,
      deposit: 1, // may take this out
    },
  ]);
};

// add function call hear

return (
  <div>
    <h1>🌈 Send NEAR to Aurora Address </h1>
    <div className=" mb-2">
      Aurora Address Your Want to Bridge
      <input
        type="text"
        placeholder={state.ethereum_receiver}
        onChange={(e) => onChangeAddress(e.target.value)}
      />
    </div>
    <div className=" mb-2">
      Enter Amount of NEAR to Bridge
      <input
        type="number"
        placeholder={state.amount / 1e24}
        onChange={(e) => onChangeAmount(e.target.value * 1e24)} // maybe 1e24 degen match
      />
      <p>
        * You will pay some extra gas in Ⓝ to bridge and the asset will be
        wrapped NEAR on Aurora
      </p>
    </div>
    <button className="btn btn-primary mt-3" onClick={bridge}>
      Bridge
    </button>
  </div>
);
