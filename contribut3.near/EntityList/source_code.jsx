const ownerId = "contribut3.near";

const allEntities = Near.view(ownerId, "get_entities", {}, "final") ?? [];

allEntities.sort(([a], [b]) => a.localeCompare(b));

return (
  <div>
    {allEntities
      ? allEntities.map(([accountId]) => (
          <Widget src={`${ownerId}/widget/Entity`} props={{ accountId }} />
        ))
      : ""}
  </div>
);
