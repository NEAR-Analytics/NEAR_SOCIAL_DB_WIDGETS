// const fetch = require('node-fetch');

// Define the NEAR account and amount to bridge
const nearAccount = "your_near_account";
const amount = "1000000000000000000"; // 1 NEAR

// Define the Aurora address to receive the bridged NEAR
const accountId = props.accountId || context.accountId;

const auroraAddress = "0x97B882530830a10f07A9f9A733cB7d0491F808Dc"; // minority programmersEth address

initState({
  near_sender: accountId, // not necessary that account id is here unless for two way bridge, takne from context
  near_amount: amount,
  ethereum_receiver: auroraAddress,
});
// Define the Rainbow Bridge API endpoint
const bridgeEndpoint = "https://bridge-api.mainnet.near.org";

const onChangeAddress = (ethereum_receiver) => {
  State.update({
    ethereum_receiver,
  });
};

const onChangeNEAR = (near_amount) => {
  State.update({
    near_amount,
  });
};

// Define the bridge method and parameters
const method = "eth.near_bridge";

const bridge = () => {
  const params = {
    near_sender: accountId,
    near_amount: amount,
    ethereum_receiver: auroraAddress,
  };
  let response = fetch("https://byz-multi-chain-01.hasura.app/v1/graphql", {
    method: "POST",
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 0,
      method,
      params,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Make the API request to the Rainbow Bridge endpoint
// const bridge = fetch(bridgeEndpoint, {
//   method: "POST",
//   body: JSON.stringify({
//     jsonrpc: "2.0",
//     id: 0,
//     method,
//     params,
//   }),
//   headers: {
//     "Content-Type": "application/json",
//   },
// })
//   .then((response) => response.json())
//   .then((data) => console.log(data.result))
//   .catch((error) => console.error(error));

return (
  <div>
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
        placeholder={state.near_amount / 1e18}
        onChange={(e) => onChangeNEAR(e.target.value * 1e18)} // maybe 1e24 degen match
      />
      <p>
        * You will pay some extra gas in Ⓝ0.1 to bridge and the asset will be
        wrapped NEAR on Aurora
      </p>
    </div>
    <button className="btn btn-primary mt-3" onClick={bridge}>
      Bridge
    </button>
  </div>
);
