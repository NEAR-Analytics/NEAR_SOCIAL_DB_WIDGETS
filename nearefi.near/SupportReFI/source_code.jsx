const accountId = props.accountId ?? "*";

const data = Social.keys(`${accountId}/post/refi`, "final", {
  return_type: "History",
});
// add human gating
if (!data) {
  return "Loading";
}
const getFirstSBTToken = () => {
  const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
    account: `${context.accountId}`,
    issuer: "fractal.i-am-human.near",
  });
  return view?.[0]?.[1]?.[0];
};
const hasSBTToken = getFirstSBTToken() !== undefined;
hasSBTToken = true; // for debug
console.log("Has SBT Token: " + hasSBTToken);
const processData = (data) => {
  const accounts = Object.entries(data);

  console.log("data", data);
  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      const blockHeights = account[1].post.refi;
      return blockHeights.map((blockHeight) => ({
        accountId,
        blockHeight,
      }));
    })
    .flat();

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  console.log("allItems", allItems);
  return allItems;
};

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allItems: processData(data),
  });
}

return (
  <div>
    {hasSBTToken == true ? (
      <div>
        <h1>🌸 Support ReFI on NEAR</h1>
        <h3>Show on chain that you support ReFi on NEAR!</h3>
        <h4>Number of Humans Supporting: {state.allItems.length}</h4>
        <CommitButton
          data={{ post: { refi: "I Support ReFI on NEAR!" } }}
          onCommit={() => {
            State.update({
              // TODO: Feed needs reload?
            });
          }}
        >
          Show Support ❤️
        </CommitButton>
        <br />
        <div>
          {state.allItems
            ? state.allItems.map(({ accountId }) => (
                <div>
                  I support ReFi! 💨
                  <Widget
                    src="miraclx.near/widget/Attribution"
                    props={{
                      dep: true,
                      authors: [accountId],
                    }}
                  />
                </div>
              ))
            : "Loading with love ..."}
        </div>
      </div>
    ) : (
      hasSBTToken == false && (
        <div
          className="px-4"
          style={{
            backgroundColor: "white",
            margin: "2rem auto 0 auto",
            width: "100%",
          }}
        >
          <div style={{ padding: "2rem" }}>
            <h2
              style={{
                fontWeight: "700",
              }}
            >
              Get Verified As a Human
            </h2>
            <p>
              Go on{" "}
              <a href="https://nearefi.org/human" target="_blank">
                i-am-human.app
              </a>{" "}
              and get ✅ faceverified as a human
            </p>
          </div>
        </div>
      )
    )}
  </div>
);
