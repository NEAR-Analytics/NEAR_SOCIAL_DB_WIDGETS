const accountId = props.accountId ?? "*";

const data = Social.keys(`${accountId}/post/yo`, "final", {
  return_type: "History",
});

if (!data) {
  return "Loading";
}

const processData = (data) => {
  const accounts = Object.entries(data);

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
  return allItems;
};

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allMemes: processData(data),
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

    {data ? state.allItems.map((yo) => <div>{yo}</div>) : "Loading"}
  </div>
);
