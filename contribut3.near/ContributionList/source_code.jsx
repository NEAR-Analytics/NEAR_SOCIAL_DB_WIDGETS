const ownerId = "contribut3.near";
const accountId = props.accountId;
const isEntity = props.isEntity ?? false;

if (!accountId) {
  return "Cannot render contribution list without account ID!";
}

const contributions = Object.keys(
  Near.view(
    ownerId,
    isEntity ? "get_entity_contributions" : "get_contributor_contributions",
    { contributor_id: accountId },
    "final",
    true
  ) ?? {}
);

console.log(contributions);)

if (!contributions) {
  return "Loading...";
}

if (Array.isArray(contributions) && contributions.length === 0) {
  return "No contribution requests found!";
}

const allContributions = contributions.filter((id) => id.includes(search));

if (!allContributions || allContributions.length === 0) {
  return "No requests match search criteria!";
}

return (
  <>
    {allContributions.map((id) => (
      <div key={id} className="mt-3">
        <Widget
          src={`${ownerId}/widget/Contribution`}
          props={{
            entityId: isEntity ? accountId : id,
            contributorId: isEntity ? id : accountId,
            update: props.update,
          }}
        />
      </div>
    ))}
  </>
);
