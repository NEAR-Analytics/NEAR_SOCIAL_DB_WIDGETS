// A simple form for creating a post that does NOT follow standards at
// https://github.com/NearSocial/standards/blob/main/types/Root.md
// because I'm just trying to get it to work
// There is no index because microposts are sorted by block height.
const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to post";
}

State.init({ postbody: null });

// Display microposts already made
const data = Social.get(`${accountId}/micropost/**`);

console.log("data", data);
if (!data) {
  return "No data to see here...";
}

// just get our index
// TODO: Filter out the not string numbers and create a clean array
const cleanPosts = Math.max(Object.keys(data));
console.log("cleanPosts", cleanPosts);

// return the rendering of posts
const fixMicropostData = (microposts) => {
  return Object.keys(microposts).map((key) => {
    console.log(microposts[key]);
    if (microposts[key].body) {
      return (
        <div class="row">
          <p key={key}>{microposts[key].body}</p>
        </div>
      );
    }
  });
};

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
            1: {
              body: state.postbody,
            },
          },
        }}
      >
        Submit
      </CommitButton>
    </div>
    <hr />
    {state.done && <div className="alert alert-success">Success!</div>}
    <h3>Micropost feed</h3>
    {fixMicropostData(data)}
  </div>
);
