const accountId = props.accountId ?? "*";

const data = Social.keys(`${accountId}/post/refi`, "final", {
  return_type: "History",
});
// add human gating
if (!data) {
  return "Loading";
}

const processData = (data) => {
  const accounts = Object.entries(data);

  console.log("data", data);
  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      const blockHeights = account[1].post.sesh;
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
    <h1>🌸 Support ReFI on NEAR</h1>
    <h3>Show on chain that you support ReFi on NEAR!</h3>
    <CommitButton
      data={{ post: { sesh: "I Support ReFI on NEAR!" } }}
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
              I want to sesh! 💨
              <Widget
                src="miraclx.near/widget/Attribution"
                props={{
                  dep: true,
                  authors: [accountId],
                }}
              />
            </div>
          ))
        : "Loading..."}
    </div>
  </div>
);
