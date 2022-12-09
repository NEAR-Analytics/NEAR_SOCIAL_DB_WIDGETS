console.log("context", context);

const accountId = context.accountId;
const loading = context.loading;

if (loading) return "Loading";
if (!accountId) return "Please sign in with NEAR wallet to use this widget";

let profile = Social.getr(`${accountId}/profile`);
// console.log("profile", profile);

let graph = Social.index("graph", "follow");
// console.log("graph");
// graph.forEach((i) => console.log(i));

let follows = graph.map((g) => [g.accountId, g.value.accountId, g.blockHeight]);

let followers = graph
  .map((g) => g.accountId)
  .reduce((acc, i) => {
    let result = acc.findIndex((el) => el.accountId === i);
    if (result === -1) {
      acc.push({ accountId: i, follows: 1 });
    } else {
      let el = {
        accountId: i,
        follows: acc[result].follows + 1,
      };
      acc[result] = el;
    }

    return acc;
  }, [])
  .sort((a, b) => b.follows - a.follows);

return (
  <>
    <h1>Leaderboard</h1>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <th>Account</th>
          <th>Other Accounts Followed</th>
        </thead>

        <tbody>
          {followers.map((pool) => (
            <tr className="align-middle">
              <th scope="row">{pool.accountId}</th>
              <td>{pool.follows}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);
