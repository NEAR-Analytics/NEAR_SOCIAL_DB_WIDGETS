const accountId = props.accountId ?? "*";

const data = Social.keys(`${accountId}/post/iwcc`, "final", {
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
      const blockHeights = account[1].post.iwcc;
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
    <h1>👋 Creatives Constellation Fingerpirnt Tree</h1>
    <h3>
      Press your finger in the Creatives Constellation Fingerprint tree!!!
    </h3>
    <CommitButton
      data={{ post: { iwcc: "I'm with Creatives Constellation!" } }}
      onCommit={() => {
        State.update({
          // TODO: Feed needs reload?
        });
      }}
    >
      Print my finger ✌️
    </CommitButton>
    <Widget
      src="williamxx.near/widget/Attribution"
      props={{
        dep: true,
        authors: ["creativesdao.near"],
      }}
    />
    <br />
    <div>
      {state.allItems
        ? state.allItems.map(({ accountId }) => (
            <div>
              I'm with Creatives Constellation!
              <Widget
                src="williamxx.near/widget/Attribution"
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
