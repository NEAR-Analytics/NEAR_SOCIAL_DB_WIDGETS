const card = {
  background: "#FFAE42",
  border: "1px solid black",
  borderRadius: "5px",
  textAlign: "center",
};

const button = {
  borderRadius: "5px",
  margin: "5px 0",
  padding: "8px",
  textAlign: "center",
  background: "#FFAE42",
  border: "2px solid black",
};

const accountId = props.accountId ?? "*";

const data = Social.keys(`${accountId}/post/CoinEasy`, "final", {
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
      const blockHeights = account[1].post.CoinEasy;
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
      style={button}
      data={{ post: { CoinEasy: "CoinEasy!" } }}
      onCommit={() => {
        State.update({
          // TODO: Feed needs reload?
        });
      }}
    >
      CoinEasy!
    </CommitButton>

    <div>
      {state.allItems
        ? state.allItems.map(({ accountId }) => (
            <div style={card}>
              {accountId} said <b>CoinEasy!</b>
            </div>
          ))
        : "Loading..."}
    </div>
  </div>
);
