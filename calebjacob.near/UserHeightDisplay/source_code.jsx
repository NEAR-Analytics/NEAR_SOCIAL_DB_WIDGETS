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
  <div className="border-top pt-3">
    <div
      className="d-flex flex-column flex-sm-row align-items-md-center"
      style={{ gap: "1rem" }}
    >
      <Widget
        src="mob.near/widget/Profile"
        props={{ accountId: props.accountId }}
      />

      {typeof props.totalInches === "number" ? (
        <div
          className="d-flex flex-row align-items-center"
          style={{ gap: "1rem", marginLeft: "auto" }}
        >
          <h1 className="m-0">{displayHeight(props.totalInches)}</h1>

          {typeof props.accuracyPercentage === "number" ? (
            <span
              className={`badge ${accuracyPercentageClassName(
                props.accuracyPercentage
              )}`}
            >
              {props.accuracyPercentage}% Accurate
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
