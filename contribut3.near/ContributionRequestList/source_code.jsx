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
  Promise.all(
    Object.keys(entities).map((entityId) =>
      Near.asyncView(
        ownerId,
        "get_entity_contribution_requests",
        { entity_id: entityId },
        "final"
      )
    )
  ).then((requestsList) =>
    State.update({
      requests: requestsList.reduce((acc, rs) => [...acc, ...rs]),
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
