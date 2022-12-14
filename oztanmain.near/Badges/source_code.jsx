const appName = "Badges";
const accountId = props.accountId;

if (!accountId) {
  return "No account ID";
}

const badges = Social.getr(`${accountID}/badges/*`);
console.log(badges);

if (badges === null) {
  return "Loading";
}
// console.log(badges);
// initState({ badges });

return (
  <div className="container row">
    <div>{badges}</div>
    <div className="mb-2">
      <CommitButton
        data={{
          badges: {
            "6-4": {
              info: {
                name: "A Tall Man TM",
                description: "A really tall man",
                image: {
                  url: "https://commons.wikimedia.org/wiki/File:Image-Vertical.jpg#/media/File:Image-Vertical.jpg",
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
