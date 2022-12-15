// A simple form for creating a post that does NOT follow standards at
// https://github.com/NearSocial/standards/blob/main/types/Root.md
// because they don't allow multiple posts.
// It saves using a very naive indexing system.
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
  console.log(data);
  const accounts = Object.entries(data);

  const allMicroposts = accounts
    .map((account) => {
      const accountId = account[0];
      const blockHeights = account[1].post.meme;
      return blockHeights.map((blockHeight) => ({
        accountId,
        blockHeight,
      }));
    })
    .flat();

  allMicroposts.sort((a, b) => b.blockHeight - a.blockHeight);
  return allMicroposts;
};

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
            i: "0",
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
    {
      <Widget
        src="mob.near/widget/Meme"
        props={{ meme: allMicroposts.last ? allMicroposts.last : undefined }}
      />
    }
  </div>
);
