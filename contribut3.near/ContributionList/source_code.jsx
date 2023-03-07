const ownerId = "contribut3.near";
const isEntity = props.isEntity ?? false;
const limit = 10;

State.init({
  items: [],
  shown: [],
  from: 0,
  hasMore: true,
});

if (state.items.length === 0) {
  Near.asyncView(
    ownerId,
    isEntity ? "get_entity_contributions" : "get_contributor_contributions",
    { account_id: props.accountId },
    "final",
    false
  ).then((accountIds) =>
    State.update({
      items: accountIds.sort(),
      shown: accountIds.slice(0, limit),
      from: limit,
      hasMore: accountIds.length > limit,
    })
  );
}

const loadMore = () => {
  State.update({
    shown: state.items.slice(0, state.from + limit),
    from: state.from + limit,
    hasMore: state.from + limit < state.items.length,
  });
};

const WidgetContainer = styled.div`
  margin: 0.5em 0;
`;

return (
  <InfiniteScroll loadMore={loadMore} hasMore={state.hasMore}>
    {state.shown
      .filter((accountId) => accountId.includes(search))
      .map((accountId) => (
        <WidgetContainer key={accountId}>
          <Widget
            src={`${ownerId}/widget/Contribution`}
            props={{
              entityId: isEntity ? props.accountId : accountId,
              contributorId: !isEntity ? props.accountId : accountId,
              isEntity,
              update: props.update,
            }}
          />
          <Widget
            src={`${ownerId}/widget/Need`}
            props={{
              accountId,
              cid,
              update: props.update,
            }}
          />
        </WidgetContainer>
      ))}
  </InfiniteScroll>
);

if (!accountId) {
  return "Cannot render contribution list without account ID!";
}

const contributions = Object.keys(
  Near.view(
    ownerId,
    isEntity ? "get_entity_contributions" : "get_contributor_contributions",
    { account_id: accountId },
    "final",
    true
  ) ?? {}
);

if (!contributions) {
  return "Loading...";
}

if (Array.isArray(contributions) && contributions.length === 0) {
  return "No contributions found!";
}

const allContributions = contributions.filter((id) =>
  id.includes(props.search)
);

if (!allContributions || allContributions.length === 0) {
  return "No contributions match search criteria!";
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
            isEntity,
            update: props.update,
          }}
        />
      </div>
    ))}
  </>
);
