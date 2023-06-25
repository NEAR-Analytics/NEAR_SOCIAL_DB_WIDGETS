const accountId = props.accountId;

if (!accountId) {
  return "";
}

const trusting = Social.keys(`${accountId}/graph/trust/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const trusted = Social.keys(`*/graph/trust/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const numTrusting = trusting
  ? Object.keys(trusting[accountId].graph.trust || {}).length
  : null;
const numTrusted = trusted ? Object.keys(trusted || {}).length : null;

return (
  <div>
    <div className="d-flex flex-row">
      <div className="me-4">
        <a
          href={`#/hack.near/widget/trust.page?accountId=${accountId}&tab=trusting`}
          className="text-dark"
        >
          {numTrusting !== null ? (
            <span className="fw-bolder">{numTrusting}</span>
          ) : (
            "?"
          )}{" "}
          <span className="text-muted">trusting</span>
        </a>
      </div>
      <div>
        <a
          href={`#/hack.near/widget/trust.page?accountId=${accountId}&tab=trusted`}
          className="text-dark"
        >
          {numTrusted !== null ? (
            <span className="fw-bolder">{numTrusted}</span>
          ) : (
            "?"
          )}{" "}
          <span className="text-muted">trusted by</span>
        </a>
      </div>
    </div>
  </div>
);
