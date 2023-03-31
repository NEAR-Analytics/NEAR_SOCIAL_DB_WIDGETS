const accountId = props.accountId ?? "*";

const data = Social.keys(`${accountId}/post/sesh`, "final", {
  return_type: "History",
});

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
    <h1>👋 Join BluntDAO</h1>
    <h3>Request A Sesh so a local OG Validator can onboard you IRL</h3>
    <CommitButton
      data={{ post: { sesh: "I want to Sesh!" } }}
      onCommit={() => {
        State.update({
          // TODO: Feed needs reload?
        });
      }}
    >
      request sesh! 💨
    </CommitButton>
    <Widget
      src="miraclx.near/widget/Attribution"
      props={{
        dep: true,
        authors: ["bluntdao.near"],
      }}
    />
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
