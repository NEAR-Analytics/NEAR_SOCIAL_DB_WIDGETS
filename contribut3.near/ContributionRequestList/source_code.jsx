const ownerId = "contribut3.near";
const search = props.search ?? "";
const accountId = props.accountId;

const adminEntities = Near.view(
  ownerId,
  "get_admin_entities",
  { account_id: context.accountId },
  "final",
  true
);

const requests = Near.view(
  ownerId,
  "get_entity_contribution_requests",
  { entity_id: accountId },
  "final",
  true
);

if (!requests) {
  return "Loading...";
}

if (Array.isArray(requests) && requests.length === 0) {
  return "No contribution requests for this entity found!";
}

const allRequests = requests.filter(
  ([contributorId, contribution]) =>
    contributorId.includes(search) && !(cid && contribution.need !== cid)
);

if (!allRequests || allRequests.length === 0) {
  return "No requests match search criteria!";
}

return (
  <>
    {allRequests.map(([contributorId]) => (
      <div key={contributorId} className="mt-3">
        <Widget
          src={`${ownerId}/widget/ContributionRequest`}
          props={{ entityId: accountId, contributorId }}
        />
      </div>
    ))}
  </>
);
