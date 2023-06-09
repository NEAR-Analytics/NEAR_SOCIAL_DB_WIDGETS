const accountId = props.accountId;

if (!accountId) {
  return "";
}

let following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (following === null) {
  return "Loading";
}

following = Object.entries(following[accountId].graph.follow || {});
following.sort((a, b) => b[1] - a[1]);

console.log(following);

return (
  <>
    {following.map(([accountId]) => (
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
