// Define the NEAR account and amount to bridge
const amount = "10000000000000000000000"; // 0.01 NEAR // maybe off
// Define the Aurora address to receive the bridged NEAR
const accountId = context.accountId; // add check for context it

const receiver_id = "aurora";
const contract_name = "wrap.near";
const auroraAddress = "0x97B882530830a10f07A9f9A733cB7d0491F808Dc"; // minority programmersEth address

// function toChecksumAddress(address) {
//   // Remove "0x" prefix if it exists
//   const addressWithoutPrefix = address.toLowerCase().replace(/^0x/, "");

//   // Compute the hash of the lowercase address
//   const hash = web3.utils.sha3(addressWithoutPrefix); // not sure if uspported

//   // Convert the hash to a hex string and compare characters of the address and the hash
//   let checksumAddress = "0x";
//   for (let i = 0; i < addressWithoutPrefix.length; i++) {
//     if (parseInt(hash[i], 16) >= 8) {
//       checksumAddress += addressWithoutPrefix[i].toUpperCase();
//     } else {
//       checksumAddress += addressWithoutPrefix[i];
//     }
//   }

//   return checksumAddress;
// }

function isEthereumAddress(address) {
  // Check if the address is a hexadecimal string of 40 characters
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
  }

  // Check if the address has a valid checksum
  // const checksumAddress = toChecksumAddress(address);
  // return address === checksumAddress;
  return true;
}

initState({
  amount: amount,
  ethereum_receiver: auroraAddress,
  valid_address: true,
});

const onChangeAddress = (ethereum_receiver) => {
  state.valid_address = isEthereumAddress(ethereum_receiver);
  console.log(state.valid_address); // checking if i updated correctly
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
      },
      gas: gas,
      deposit: 1, // may take this out
    },
  ]);
};
return (
  <div>
    <h1>🌈 Send NEAR to Aurora Address </h1>
    <div className=" mb-2">
      Aurora Address to Bridge To
      <input
        type="text"
        placeholder={state.ethereum_receiver}
        onChange={(e) => onChangeAddress(e.target.value)}
      />
    </div>{" "}
    {!state.valid_address && (
      <div className="alert alert-danger">
        <i className="bi bi-x"></i> Not an Aurora (ETH) Address
      </div>
    )}
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
