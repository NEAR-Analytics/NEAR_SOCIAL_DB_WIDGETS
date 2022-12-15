// A simple form for creating a post that follows the post standard at
// https://github.com/NearSocial/standards/blob/main/types/Root.md
// It is basically a meme with only a description
let accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to post";
}

State.init({ memo: null });

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
        onChange={(event) => State.update({ memo: event.target.value })}
      ></textarea>
    </div>

    <div>
      <CommitButton
        disabled={state.memo === null}
        data={{
          post: {
            meme: {
              description: state.memo,
            },
          },
        }}
      >
        Submit
      </CommitButton>
    </div>
  </div>
);
