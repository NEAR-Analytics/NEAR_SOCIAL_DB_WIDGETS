// A simple form for creating a post that does NOT follow standards at
// https://github.com/NearSocial/standards/blob/main/types/Root.md
// because I'm just trying to get it to work
// There is no index because microposts are sorted by block height.
let accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to post";
}

State.init({ postbody: null });

// Display microposts already made
const data = Social.keys(`${accountId}/micropost`, "final", {
  return_type: "History",
});
const processData = (data) => {
  //console.log(data);
  const accounts = Object.entries(data);

  const allMicroposts = accounts
    .map((account) => {
      const accountId = account[0];
      const blockHeights = account[1].micropost.postbody;
      return blockHeights.map((blockHeight) => ({
        accountId,
        blockHeight,
      }));
    })
    .flat();

  allMicroposts.sort((a, b) => b.blockHeight - a.blockHeight);
  console.log("returning all microposts...");
  console.log(allMicroposts);
  console.log("...done?");
  return allMicroposts;
};

// How to render a micropost
const renderItem = (a) => (
  <div key={JSON.stringify(a)} style={{ minHeight: "200px" }}>
    <a
      className="text-decoration-none"
      href={`#/mob.near/widget/Meme?accountId=${a.accountId}&blockHeight=${a.blockHeight}`}
    >
      This is the old render area
    </a>
    <h4>This is a micropost</h4>
    <p>still need to find a real one, though...</p>
    <p>{a}</p>
  </div>
);

// Create micropost button

return (
  <div>
    <div className="mb-3">
      <label for="exampleFormControlTextarea1" className="form-label">
        Write a short post and it'll show up in the timeline of your followers
      </label>
      <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        rows="2"
        style={{ maxWidth: "30em" }}
        onChange={(event) => State.update({ postbody: event.target.value })}
      ></textarea>
    </div>

    <div>
      <CommitButton
        disabled={state.memo === null}
        data={{
          micropost: {
            body: state.postbody,
          },
        }}
      >
        Submit
      </CommitButton>
    </div>
    <hr />
    {state.done && <div className="alert alert-success">Success!</div>}
    <h3>Micropost feed</h3>
    {allMicroposts.stringify}
    {renderItem(allMicroposts.last)}
  </div>
);
