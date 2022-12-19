const accountId = props.accountId;

if (!accountId) {
  return "";
}

let members = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (members === null) {
  return "Loading";
}

members = Object.entries(members[accountId].graph.follow || {});
members.sort((a, b) => b[1] - a[1]);

console.log(members);

return (
  <>
    {members.map(([accountId]) => (
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
