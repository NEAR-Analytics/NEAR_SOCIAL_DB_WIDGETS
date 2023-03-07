const ownerId = "contribut3.near";
const limit = 10;
const search = props.search ?? "";

State.init({
  entities: [],
  shown: [],
  from: 0,
  hasMore: true,
});

if (state.entities.length === 0) {
  Near.asyncView(
    ownerId,
    "get_admin_entities",
    { account_id: context.accountId },
    "final",
    false
  ).then((entities) =>
    State.update({
      entities: entities.sort(),
      shown: entities.slice(0, limit),
      from: limit,
      hasMore: entities.length > limit,
    })
  );
}

const loadMore = () =>
  State.update({
    shown: state.entities.slice(0, state.from + limit),
    from: state.from + limit,
    hasMore: state.from + limit < state.entities.length,
  });

const WidgetContainer = styled.div`
  margin-bottom: 0.5em;
`;

return (
  <InfiniteScroll loadMore={loadMore} hasMore={state.hasMore}>
    {state.shown
      .filter((accountId) => accountId.includes(search))
      .map((accountId) => (
        <WidgetContainer key={accountId}>
          <Widget
            src={`${ownerId}/widget/Entity`}
            props={{
              accountId,
              notStandalone: false,
              inboxView: true,
              update: props.update,
            }}
          />
        </WidgetContainer>
      ))}
  </InfiniteScroll>
);
