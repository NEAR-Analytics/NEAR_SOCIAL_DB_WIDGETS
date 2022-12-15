const users = [
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

const user = users.find((u) => u.accountId === props.accountId);

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

if (!props.accountId) return "Missing prop: accountId";
if (!user) return "Loading...";

return (
  <div>
    <div
      className="d-flex flex-column flex-sm-row align-items-md-center"
      style={{ gap: "1rem" }}
    >
      <Widget
        src="mob.near/widget/Profile"
        props={{ accountId: props.accountId }}
      />

      {typeof user.height === "number" ? (
        <div
          className="d-flex flex-row align-items-center"
          style={{ gap: "1rem", marginLeft: "auto" }}
        >
          <h1 className="m-0">{displayHeight(user.height)}</h1>

          {typeof user.accuracyPercentage === "number" ? (
            <span
              className={`badge ${accuracyPercentageClassName(
                user.accuracyPercentage
              )}`}
            >
              {user.accuracyPercentage}% Accurate
            </span>
          ) : (
            <span className="badge text-bg-secondary">Not Confirmed</span>
          )}
        </div>
      ) : (
        <div style={{ marginLeft: "auto" }}>
          <span className="badge text-bg-secondary">Height Not Set</span>
        </div>
      )}
    </div>
  </div>
);
