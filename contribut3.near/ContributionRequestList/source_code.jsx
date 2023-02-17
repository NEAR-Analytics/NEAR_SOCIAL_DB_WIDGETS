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

const allNeeds = requests.filter(([contributorId]) =>
  contributorId.includes(search)
);

if (!allNeeds || allNeeds.length === 0) {
  return "No contribution needs found!";
}

return (
  <>
    {allNeeds.map(([accountId, cid]) => (
      <div key={cid} className="mb-2">
        <Widget src={`${ownerId}/widget/Need`} props={{ accountId, cid }} />
      </div>
    ))}
  </>
);
