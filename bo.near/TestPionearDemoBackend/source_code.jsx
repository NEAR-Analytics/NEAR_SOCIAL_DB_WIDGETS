const res = fetch("https://near-validators.carrymusic.club/");
const validators = res.body;

const allWidgets = [];

for (let i = 0; i < validators.length; ++i) {
  let validator = validators[i];
  console.log(validator);

  allWidgets.push(
    <tr>
      <td>{validator.accountId}</td>
      <td>{validator.publicKey}</td>
      <td>{validator.telemetry ? validator.telemetry.ipAddress : ""}</td>
    </tr>
  );
}

return (
  <div className="container row">
    <table className="table table-striped">
      <tbody>{allWidgets}</tbody>
    </table>
  </div>
);
