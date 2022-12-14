const ownerId =
  "a92d2106fd31a2d52501953961b1639745434ee343fb6303e4d0195b501b75adr";
const appName = "ProofOfHeight";
const accountId = context.accountId;
const contractId = props.contractId ?? ownerId;

if (!accountId) {
  return "No account ID";
}

//const badges = Social.keys(`*/${contractId}/badges/*`, "final");
const badges = Social.getr(`${contractId}/badges/*`);
//const height = props.height ?? 7;
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
            cool: {
              info: {
                name: "🕶",
                description: "stay cool my guy",
                image: {
                  url: "https://i.giphy.com/media/l6Td5sKDNmDGU/giphy.webp",
                },
              },
              holder: {
                [accountId]: "",
                "calebjacob.near": "",
              },
            },
          },
        }}
      >
        I SWEAR I'M COOL!
      </CommitButton>
    </div>
  </div>
);
