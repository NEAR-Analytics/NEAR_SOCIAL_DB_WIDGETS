const paymasterContract = "";
const tokenDecimals = 18; // double check on contract
// FETCH Paymaster ABI

// see if API3 can be fetched here

const paymasterABI = fetch(
  "https://raw.githubusercontent.com/codingshot/zksync-paymaster/main/paymaster-abi.json"
);
if (!paymasterABI.ok) {
  return "Loading";
}
// https://raw.githubusercontent.com/codingshot/zksync-paymaster/main/paymaster-abi.json

return (
  <div>
    <h1>Paymaster Boilerplate</h1>
    <p>Input Payment token</p>
    <p>Input Amount</p>
    <p>Input reciever</p>
    <Web3Connect
      className="Paymaster Connect"
      connectLabel="Connect to ZK Sync"
    />
  </div>
);
