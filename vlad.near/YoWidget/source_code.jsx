const accountId = props.accountId ?? "*";

const data = Social.keys(`${accountId}/post/yo`, "final", {
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
      const blockHeights = account[1].post.yo;
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
      data={{ post: { yo: "yo!" } }}
      onCommit={() => {
        State.update({
          // TODO: Feed needs reload?
        });
      }}
    >
      yo!
    </CommitButton>

    <div>
      {state.allItems
        ? state.allItems.map(({ accountId }) => (
            <div>
              {accountId} said <b>yo!</b>
            </div>
          ))
        : "Loading..."}
    </div>
  </div>
);
