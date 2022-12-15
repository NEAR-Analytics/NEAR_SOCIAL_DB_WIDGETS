// A simple form for creating a post that does NOT follow standards at
// https://github.com/NearSocial/standards/blob/main/types/Root.md
// because they don't allow multiple posts.
// It saves using a very naive indexing system.
let accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to post";
}

State.init({ postbody: null });

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
  </div>
);
