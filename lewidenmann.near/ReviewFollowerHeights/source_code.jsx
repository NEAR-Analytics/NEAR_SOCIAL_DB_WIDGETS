const contractId = "proof_of_height.lewidenmann.near";
const accountId = context.accountId;
if (!accountId) {
  return "Please login to use Proof of Height";
}

State.init({
  currentFollowerIndex: 0,
});

const follows = Social.get(`${accountId}/graph/follow/**`);

console.log("this account follows", follows);

const followers = follows
  ? Object.keys(follows)
      .map((f) => {
        console.log("a follower", f);
        return {
          accountId: f,
          height: Near.view(contractId, "get_height_inches", { account_id: f }),
        };
      })
      .filter((f) => f.height)
      .filter((f) => {
        const voted = Near.view(contractId, "get_who_voted_for", {
          account_id: f.accountId,
        });
        console.log("who voted for", f.accountId, ":", voted);
        return voted ? !voted.includes(accountId) : false;
      })
  : [];

const hasFinishedReviewing = followers.length === 0;

console.log("followers with a height", followers);

const reviewOptions = [
  {
    display: "Definitely Yes",
    className: "btn-success",
    value: 2,
    enum: "DefinitelyYes",
  },
  {
    display: "Yes",
    className: "btn-primary",
    value: 1,
    enum: "Yes",
  },
  {
    display: "No",
    className: "btn-warning",
    value: -1,
    enum: "No",
  },
  {
    display: "Definitely No",
    className: "btn-danger",
    value: -2,
    enum: "DefinitelyNo",
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
  Near.call(contractId, "vote", {
    account_id: follower.accountId,
    vote: option.enum,
  });
  // Near.call will kick out to wallet and cause this whole widget to re-render.
  // Leaving this in just-in-case.
  nextFollower();
}

function skipHeightReview() {
  nextFollower();
}

function nextFollower() {
  const nextIndex = state.currentFollowerIndex + 1;

  if (nextIndex < followers.length) {
    State.update({
      currentFollowerIndex: nextIndex,
    });
  } else {
    State.update({
      currentFollowerIndex: 0,
    });
  }
}

return (
  <div class="card">
    {hasFinishedReviewing ? (
      <div className="p-3">
        <h5>Review Your Followers&apos; Heights</h5>

        <hr />

        <div class="alert alert-success m-0" role="alert">
          No heights to review right now. Add more followers and get them to add
          their height!
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
              src="lewidenmann.near/widget/Profile"
              props={{ accountId: currentFollower.accountId }}
            />
            <h1 style={{ borderLeft: "1px solid", paddingLeft: "1rem" }}>
              {displayHeight(currentFollower.height)}
            </h1>
          </div>
        </div>

        <div
          className="card-footer p-3"
          style={{ gap: "1rem", display: "block" }}
        >
          <div
            className="d-flex flex-column flex-md-row align-items-start"
            style={{ gap: "1rem" }}
          >
            <div
              className="btn-group"
              style={{ gap: "0.25rem", marginRight: "auto" }}
            >
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

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={skipHeightReview}
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
