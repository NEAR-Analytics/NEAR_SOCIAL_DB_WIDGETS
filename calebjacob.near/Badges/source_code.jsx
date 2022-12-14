const appName = "Badges";
const accountId = props.accountId;

if (!accountId) {
  return "No account ID";
}

// const badges = Social.getr(`*/badges/*`);
// const badges = Social.getr(`*/badges`, "final");
const badges = Social.getr(`${accountId}/*`);
// const badges = Social.getr(`${accountId}/profile`);

console.log(badges);

if (badges === null) {
  return "Loading";
}
// console.log(badges);
// initState({ badges });

return (
  <div className="container row">
    // <div>{badges}</div>
    <div className="mb-2">
      <CommitButton
        data={{
          badges: {
            whale: {
              info: {
                name: "Whale",
                description: "A really whalethy user",
                image: {
                  url: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Southern_right_whale.jpg",
                },
              },
              holder: {
                [accountId]: "",
              },
            },
          },
        }}
      >
        Get that badge
      </CommitButton>
    </div>
  </div>
);
