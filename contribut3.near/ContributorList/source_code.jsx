const ownerId = "contribut3.near";
const search = props.search ?? "";
const accountId = props.accountId;

const allContributors = (
  Near.view(
    ownerId,
    accountId ? "get_entity_contributions" : "get_contributors",
    accountId ? { entity_id: accountId } : {},
    "final",
    true
  ) ?? []
)
  .filter((accountId) => (search ? accountId.includes(search) : true))
  .sort((a, b) => a.localeCompare(b));

if (!allContributors || allContributors.length === 0) {
  return "No contributors found!";
}

return (
  <>
    {allContributors.map((accountId) => (
      <div key={accountId} className="mb-2">
        <Widget
          src={`${ownerId}/widget/Contributor`}
          props={{ accountId, notStandalone: true }}
        />
      </div>
    ))}
  </>
);
