const ownerId = "contribut3.near";
const search = props.search ?? "";
const accountId = props.accountId;

const requests =
  Near.view(
    ownerId,
    accountId
      ? "get_entity_contribution_requests"
      : "get_admin_contribution_requests",
    accountId ? { entity_id: accountId } : { account_id: context.accountId },
    "final",
    true
  ) || [];

if (!requests) {
  return "Loading...";
}

if (Array.isArray(requests) && requests.length === 0) {
  return "No contribution requests found!";
}

const allRequests = requests.filter(
  ([entityId, contributorId]) =>
    contributorId.includes(search) || entityId.includes(search)
);

if (!allRequests || allRequests.length === 0) {
  return "No requests match search criteria!";
}

return (
  <>
    {allRequests.map(([entityId, contributorId]) => (
      <div key={contributorId} className="mt-3">
        <Widget
          src={`${ownerId}/widget/ContributionRequest`}
          props={{ entityId, contributorId, update: props.update }}
        />
      </div>
    ))}
  </>
);
