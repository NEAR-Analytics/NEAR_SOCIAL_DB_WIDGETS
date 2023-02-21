const accountId = props.accountId || context.accountId;
const AFFILIATE_ACCOUNT = props.affiliateAccount || "evrything.near";

const data = fetch("https://monkfish-app-ginhc.ondigitalocean.app/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: `
      query findThings {
        findThings {
            id
        }   
      }
`,
  }),
});

if (!data.ok) {
  return "Loading";
}

return data !== null ? (
  <>
    <h1>everything</h1>
    <div className="d-flex gap-4 flex-wrap">
      {data.body.data?.findThings.map((thing, i) => {
        return (
          <div className="d-flex flex-column gap-1">
            <Widget
              src="efiz.near/widget/CommitThing"
              props={{
                thing: thing,
              }}
            />
          </div>
        );
      })}
    </div>
  </>
) : (
  <p>loading...</p>
);
