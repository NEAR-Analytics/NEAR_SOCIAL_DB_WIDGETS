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

const allNeeds = Object.keys(requests)
  .reduce((list, accountIdOrCid) => {
    if (props.accountId) {
      return [
        ...list,
        [props.accountId, accountIdOrCid, needs[accountIdOrCid]],
      ];
    }

    const entityNeeds = needs[accountIdOrCid];
    const needsList = Object.keys(entityNeeds).map((cid) => [
      accountIdOrCid,
      cid,
      entityNeeds[cid],
    ]);

    return [...list, ...needsList];
  }, [])
  .filter(
    ([accountId, _, need]) =>
      accountId.includes(search) ||
      need.description.includes(search) ||
      need.contribution_type.includes(search)
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
