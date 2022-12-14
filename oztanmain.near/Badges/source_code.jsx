const appName = "Badges";
const accountId = props.accountId;

if (!accountId) {
  return "No account ID";
}

const badges = Social.getr(`${accountId}/badges/*`);
console.log(badges);

if (badges === null) {
  return "Loading";
}

return (
  <div className="container row">
    <div>
      {Object.values(badges).map((badge) => {
        return <p>{badge.info.name}</p>;
      })}
    </div>
  </div>
);
