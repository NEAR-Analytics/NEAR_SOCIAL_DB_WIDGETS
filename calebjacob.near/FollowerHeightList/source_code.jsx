const followers = [
  {
    accountId: "calebjacob.near",
    height: 69,
    accuracyPercentage: 95,
  },
  {
    accountId: "lewidenmann.near",
    height: 72,
    accuracyPercentage: 70,
  },
  {
    accountId: "oztanmain.near",
    height: null,
    accuracyPercentage: null,
  },
];

function displayHeight(height) {
  const feet = Math.floor(height / 12);
  const inches = height - feet * 12;
  return `${feet}′${inches}″`;
}

function accuracyPercentageClassName(accuracyPercentage) {
  if (accuracyPercentage < 25) {
    return "text-bg-danger";
  } else if (accuracyPercentage < 50) {
    return "text-bg-warning";
  } else if (accuracyPercentage < 75) {
    return "text-bg-primary";
  } else {
    return "text-bg-success";
  }
}

return (
  <div class="container">
    <div className="card p-3">
      <h5 className="mb-3">Your Followers&apos; Heights</h5>

      {followers.length === 0 && <p>You don&apos;t have any followers yet.</p>}

      <div className="d-flex flex-column" style={{ gap: "1rem" }}>
        {followers.map((follower) => {
          return (
            <div className="border-top pt-3">
              <Widget
                src="calebjacob.near/widget/UserHeightDisplay"
                props={{
                  accountId: follower.accountId,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
