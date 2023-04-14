const data = Social.keys("*/profile", "final");

const lastN = props.lastN || 21;

if (!data) {
  return "Loading";
}

let accounts = Object.entries(data);
const numAccounts = accounts.length;
accounts = accounts.slice(numAccounts - lastN, numAccounts);

const allWidgets = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];

  allWidgets.push(
    <a
      href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
      className="text-decoration-none"
      key={accountId}
    >
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          accountId,
          tooltip: true,
          className: "d-inline-block overflow-hidden",
        }}
      />
    </a>
  );
}

return (
  <div>
    <div>{allWidgets}</div>
    <div>Total {numAccounts} profiles</div>
  </div>
);
