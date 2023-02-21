const ownerId = "contribut3.near";
const search = props.search ?? "";
const accountId = props.accountId;

State.init({
  requests: null,
});

const adminEntities = Near.asyncView(
  ownerId,
  "get_admin_entities",
  { account_id: context.accountId },
  "final"
).then((entities) => {
  Object.keys(entities).map((entityId) =>
    Near.asyncView(
      ownerId,
      "get_entity_contribution_requests",
      { entity_id: entityId },
      "final"
    ).then((requests) => {
      State.update({ requests: { ...state.requests, [entityId]: requests } });
    })
  );
});

// const requests = Object.keys(adminEntities).reduce((entity_id) => Near.view(ownerId,
//   "get_entity_contribution_requests",
//   { entity_id: entityId },
//   "final",
//   true
// );

if (!state.requests) {
  return "Loading...";
}

if (Array.isArray(state.requests) && state.requests.length === 0) {
  return "No contribution requests for this entity found!";
}

const allRequests = Object.keys(state.requests)
  .reduce(
    (acc, entityId) => [
      ...acc,
      ...state.requests[entityId].map(([contributorId, contribution]) => [
        entityId,
        contributorId,
        contribution,
      ]),
    ],
    []
  )
  .filter(
    ([entityId, contributorId]) =>
      contributorId.includes(search) || entityId.includes(search)
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
