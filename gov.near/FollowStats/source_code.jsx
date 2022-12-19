const accountId = props.accountId;

if (!accountId) {
  return "";
}

const members = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const subscribers = Social.keys(`*/graph/follow/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const numMembers = members
  ? Object.keys(members[accountId].graph.follow || {}).length
  : null;
const numSubscribers = subscribers
  ? Object.keys(subscribers || {}).length
  : null;

return (
  <div>
    <div className="d-flex flex-row">
      <div className="me-4">
        <a
          href={`#/gov.near/widget/FollowPage?accountId=${accountId}&tab=following`}
          className="text-dark"
        >
          {numMembers !== null ? (
            <span className="fw-bolder">{numMembers}</span>
          ) : (
            "?"
          )}{" "}
          <span className="text-muted">Members</span>
        </a>
      </div>
      <div>
        <a
          href={`#/gov.near/widget/FollowPage?accountId=${accountId}&tab=subscribers`}
          className="text-dark"
        >
          {numSubscribers !== null ? (
            <span className="fw-bolder">{numSubscribers}</span>
          ) : (
            "?"
          )}{" "}
          <span className="text-muted">
            Subscriber{numSubscribers !== 1 && "s"}
          </span>
        </a>
      </div>
    </div>
  </div>
);
