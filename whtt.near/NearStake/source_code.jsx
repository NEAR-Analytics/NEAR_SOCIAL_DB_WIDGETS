initState({ amount: "1", poolId: "zavodil.poolv1.near" });

const onStakeClick = () => {
  const gas = 300 * 1000000000000;
  // TODO: doesn't support floats right now due to limitation of JS integers
  const deposit = parseInt(state.amount) + "000000000000000000000000";
  console.log(gas, deposit);
  Near.call(state.poolId, "deposit_and_stake", {}, gas, deposit);
};

const abi =
  '[{"constant":true,"inputs":[],"name":"proxyType","outputs":[{"name":"proxyTypeId","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"isDepositable","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"implementation","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"appId","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"kernel","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_kernel","type":"address"},{"name":"_appId","type":"bytes32"},{"name":"_initializePayload","type":"bytes"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"ProxyDeposit","type":"event"}]';

return (
  <div>
    <h1>Stake NEAR</h1>
    <p>
      Pool: <input value={state.poolId} />
    </p>
    <p>
      Amount: <input type="number" value={state.amount} />
    </p>
    <a onClick={onStakeClick}>Stake</a>
  </div>
);
