const contractId = "proof_of_height.lewidenmann.near";
const accountId = props.accountId;

if (!accountId) return "Missing prop: accountId";

const user = {
  accountId,
  height: Near.view(contractId, "get_height_inches", { account_id: accountId }),
  confidence: Near.view(contractId, "get_confidence", {
    account_id: accountId,
  }),
};

console.log("user info:", user);

function displayHeight(height) {
  const feet = Math.floor(height / 12);
  const inches = height % 12;
  return `${feet}′${inches}″`;
}

function confidenceClassName(confidence) {
  if (confidence === "Lie") {
    return "text-bg-danger";
  } else if (confidence === "ProbablyALie") {
    return "text-bg-warning";
  } else if (confidence === "MightBeTrue") {
    return "text-bg-primary";
  } else if (confidence === "True") {
    return "text-bg-success";
  } else {
    return "text-bg-dark";
  }
}

function confidenceText(confidence) {
  if (confidence === "Lie") {
    return "Liar 🙅";
  } else if (confidence === "ProbablyALie") {
    return "Liar-ish 😐";
  } else if (confidence === "MightBeTrue") {
    return "True-ish 👍";
  } else if (confidence === "True") {
    return "True 💯";
  } else {
    return "Maybe 🤷";
  }
}

return (
  <div>
    <div
      className="d-flex flex-column flex-sm-row align-items-md-center"
      style={{ gap: "1rem" }}
    >
      {!props.compact && (
        <div style={{ marginRight: "auto" }}>
          <Widget
            src="lewidenmann.near/widget/Profile"
            props={{ accountId: props.accountId }}
          />
        </div>
      )}

      {typeof user.height === "number" ? (
        <div
          className="d-flex flex-row align-items-center"
          style={{ gap: "1rem" }}
        >
          <h1 className="m-0">{displayHeight(user.height)}</h1>

          {user.confidence ? (
            <span
              style={{ width: "7rem", lineHeight: "1.5rem" }}
              className={`badge ${confidenceClassName(user.confidence)}`}
            >
              {confidenceText(user.confidence)}
            </span>
          ) : (
            <span
              style={{ width: "7rem", lineHeight: "1.5rem" }}
              className="badge text-bg-dark"
            >
              Unverified
            </span>
          )}
        </div>
      ) : (
        <div>
          <span
            style={{ width: "7rem", lineHeight: "1.5rem" }}
            className="badge text-bg-secondary"
          >
            Height Not Set
          </span>
        </div>
      )}
    </div>
  </div>
);
