const ownerId = "contribut3.near";
const search = props.search ?? "";
const accountId = props.accountId;

const requests = Near.view(
  ownerId,
  "get_entity_contribution_requests",
  { entity_id: accountId },
  "final",
  true
);

const allRequests = requests.filter(([contributorId]) =>
  contributorId.includes(search)
);

if (!allRequests || allRequests.length === 0) {
  return "No contribution needs found!";
}

return (
  <>
    {allRequests.map(([accountId, cid]) => (
      <div key={cid} className="mb-2">
        <Widget src={`${ownerId}/widget/Need`} props={{ accountId, cid }} />
      </div>
    ))}
  </>
);
