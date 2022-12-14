const accountId = props.accountId ?? "*";

const data = Social.keys(`${accountId}/post/yes`, "final", {
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
      const blockHeights = account[1].post.yes;
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
    <h3>Are you here to BUIDL?</h3>
    <img src="https://bafkreic3jgz5pnmyf55wraiu4k6qy7bnaxg27folyrizxqxguqknkkq7iq.ipfs.nftstorage.link/" />
    <br />
    <br />

    <CommitButton
      data={{ post: { yes: "Let's BUIDL!" } }}
      onCommit={() => {
        State.update({
          // TODO: Feed needs reload?
        });
      }}
    >
      Let's BUIDL!
    </CommitButton>

    <div>
      {state.allItems
        ? state.allItems.map(({ accountId }) => (
            <div>
              {accountId} said <b>Let's BUIDL!</b>
            </div>
          ))
        : "Loading..."}
    </div>
  </div>
);
