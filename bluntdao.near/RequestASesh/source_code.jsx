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
    <CommitButton
      data={{ post: { sesh: "I want to Sesh!" } }}
      onCommit={() => {
        State.update({
          // TODO: Feed needs reload?
        });
      }}
    >
      sesh!
    </CommitButton>

    <div>
      {state.allItems
        ? state.allItems.map(({ accountId }) => (
            <div>
              {accountId} said <b>I want to sesh!</b>
            </div>
          ))
        : "Loading..."}
    </div>
  </div>
);
