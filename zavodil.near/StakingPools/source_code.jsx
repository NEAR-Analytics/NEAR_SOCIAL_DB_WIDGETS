// StakingPools
let data = fetch("https://near.zavodil.ru/pools.txt");
if (!data) {
  return "Loading1";
}

data = JSON.parse(data.body);
if (!data.data.length) {
  return "Illegal data";
}

let pools = data.data.map((pool) => (
  <tr className="align-middle">
    <th scope="row">{pool.account_id}</th>
    <td>{parseFloat(pool.numerator.toFixed(2))}%</td>
    <td>{pool.number_of_accounts}</td>
    <td>{pool.stake.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")} Ⓝ</td>
    <td>
      <a
        className="btn btn-primary"
        href={`/#/zavodil.near/widget/NearStake?poolId=${
          pool.account_id
        }&serviceFee=${parseFloat(pool.numerator.toFixed(2))}`}
        role="button"
      >
        Stake
      </a>
    </td>
  </tr>
));

return (
  <>
    <table className="table table-striped">
      <thead>
        <th>Pool ID</th>
        <th>Service Fee</th>
        <th>Delegators</th>
        <th>Current Stake</th>
        <th>Action</th>
      </thead>

      <tbody>{pools}</tbody>
    </table>
  </>
);
