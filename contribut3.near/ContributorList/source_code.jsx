const ownerId = "contribut3.near";
const search = props.search ?? "";

const allContributors = (
  Near.view(ownerId, "get_contributors", {}, "final") ?? []
).filter(([accountId]) => (search ? accountId.includes(search) : true));

allContributors.sort(([a], [b]) => a.localeCompare(b));

return (
  <div>
    {allContributors
      ? allContributors.map(([accountId]) => (
          <div key={accountId} className="mb-2">
            <Widget
              src={`${ownerId}/widget/Contributor`}
              props={{ accountId, notStandalone: true }}
            />
          </div>
        ))
      : ""}
  </div>
);
