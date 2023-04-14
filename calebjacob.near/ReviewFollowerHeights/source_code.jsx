State.init({
  currentFollowerIndex: 0,
  hasFinishedReviewing: false,
});

const reviewOptions = [
  {
    display: "Definitely Yes",
    className: "btn-success",
    value: 1,
  },
  {
    display: "Yes",
    className: "btn-primary",
    value: 0.5,
  },
  {
    display: "No",
    className: "btn-warning",
    value: -0.5,
  },
  {
    display: "Definitely No",
    className: "btn-danger",
    value: -1,
  },
];

const followers = [
  {
    accountId: "calebjacob.near",
    height: 69,
  },
  {
    accountId: "lewidenmann.near",
    height: 72,
  },
];
const currentFollower = followers[state.currentFollowerIndex];

function displayHeight(height) {
  const feet = Math.floor(height / 12);
  const inches = height - feet * 12;
  return `${feet}′${inches}″`;
}

function submitHeightReview(follower, option) {
  console.log("Option selected:", follower, option);

  const nextIndex = state.currentFollowerIndex + 1;

  if (nextIndex < followers.length) {
    State.update({
      currentFollowerIndex: nextIndex,
    });
  } else {
    State.update({
      hasFinishedReviewing: true,
    });
  }
}

return (
  <div class="card">
    {state.hasFinishedReviewing ? (
      <div className="p-3">
        <h5>Review Your Followers&apos; Heights</h5>

        <hr />

        <div class="alert alert-success m-0" role="alert">
          You have reviewed all of your followers&apos; heights.
        </div>
      </div>
    ) : (
      <div>
        <div className="p-3">
          <h5>
            {`Review Your Followers' Heights (${
              state.currentFollowerIndex + 1
            } of ${followers.length})`}
          </h5>

          <hr />

          <h6 className="mb-3">Is this user&apos;s height accurate?</h6>

          <div className="d-flex flex-row" style={{ gap: "1rem" }}>
            <Widget
              src="mob.near/widget/Profile"
              props={{ accountId: currentFollower.accountId }}
            />
            <h1 style={{ borderLeft: "1px solid", paddingLeft: "1rem" }}>
              {displayHeight(currentFollower.height)}
            </h1>
          </div>
        </div>

        <div className="card-footer p-3">
          <div className="btn-group" style={{ gap: "0.25rem" }}>
            {reviewOptions.map((option) => {
              return (
                <button
                  type="button"
                  className={`btn ${option.className}`}
                  onClick={() => {
                    submitHeightReview(currentFollower, option);
                  }}
                >
                  {option.display}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    )}
  </div>
);
