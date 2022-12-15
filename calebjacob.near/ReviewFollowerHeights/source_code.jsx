State.init({
  currentFollowerIndex: 0,
});

const followers = [
  {
    address: "calebjacob.near",
    height: 69,
  },
];
const currentFollower = followers[state.currentFollowerIndex];

function displayHeight(height) {
  const feet = Math.floor(height / 12);
  const inches = height - feet * 12;
  return `${feet}′${inches}″`;
}

return (
  <div class="card p-3">
    <h5>Review Your Follower&apos;s Heights (1 of 5)</h5>

    <hr />

    <p>Is this user&apos;s height accurate?</p>

    <div className="d-flex flex-row mb-3" style={{ gap: "1rem" }}>
      <Widget
        src="mob.near/widget/Profile"
        props={{ accountId: "calebjacob.near" }}
      />
      <h1>{displayHeight(currentFollower.height)}</h1>
    </div>

    <div className="btn-group" style={{ gap: "0.25rem" }}>
      <button
        type="button"
        className="btn btn-success"
        onClick={() => {
          submitHeightReview("DEFINITELY_YES");
        }}
      >
        Definitely Yes
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          submitHeightReview("YES");
        }}
      >
        Yes
      </button>
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => {
          submitHeightReview("NO");
        }}
      >
        No
      </button>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => {
          submitHeightReview("DEFINITELY_NO");
        }}
      >
        Definitely No
      </button>
    </div>
  </div>
);
