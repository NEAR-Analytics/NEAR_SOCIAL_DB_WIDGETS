const accountId = props.accountId ?? "*";

const data = Social.keys(`${accountId}/post/nqn`, "final", {
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
      const blockHeights = account[1].post.nqn;
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

const allItems = processData(data);

return (
  <div>
    <h1>🤓 Near Quiz Night</h1>
    <h3>
      Click to confirm your attendance for the June 14 2023 Near Quiz Night!
    </h3>
    <CommitButton
      data={{
        post: { nqn: "I participated in the June 14 2023 Near Quiz Night" },
      }}
      onCommit={() => {
        State.update({
          // TODO: Feed needs reload?
        });
      }}
    >
      Confirm my attendance 🙋
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
      {allItems
        ? allItems.map(({ accountId }) => (
            <div>
              I participated in the June 14 2023 Near Quiz Night
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
