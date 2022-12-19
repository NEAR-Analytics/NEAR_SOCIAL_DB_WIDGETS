const accountId = props.accountId;

if (!accountId) {
  return "";
}

let subscribers = Social.keys(`*/graph/follow/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (subscribers === null) {
  return "Loading";
}

subscribers = Object.entries(subscribers || {});
subscribers.sort(
  (a, b) => b.graph.follow[accountId][1] - a.graph.follow[accountId][1]
);

return (
  <>
    {subscribers.map(([accountId]) => (
      <div className="d-flex justify-content-between mb-3">
        <div className="me-4">
          <Widget src="gov.near/widget/Project" props={{ accountId }} />
        </div>
        <div>
          <Widget src="gov.near/widget/FollowButton" props={{ accountId }} />
        </div>
      </div>
    ))}
  </>
);
