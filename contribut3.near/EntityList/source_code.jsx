const ownerId = "contribut3.near";
const search = props.search ?? "";

const allEntities = (
  Near.view(ownerId, "get_entities", {}, "final", true) ?? []
).filter(([accountId]) => (search ? accountId.includes(search) : true));

allEntities.sort(([a], [b]) => a.localeCompare(b));

return (
  <div>
    {allEntities
      ? allEntities.map(([accountId]) => (
          <div key={accountId} className="mb-2">
            <Widget
              src={`${ownerId}/widget/Entity`}
              props={{ accountId, notStandalone: true }}
            />
          </div>
        ))
      : ""}
  </div>
);
