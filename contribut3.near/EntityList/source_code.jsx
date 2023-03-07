const ownerId = "contribut3.near";
const search = props.search ?? "";
const limit = 10;

State.init({
  entities: [],
  shown: [],
  from: 0,
  hasMore: true,
});

Near.asyncView(ownerId, "get_entities", {}, "final", false).then((entities) => {
  if (state.entities.length === 0) {
    entities.sort();
    State.update({
      entities,
      shown: entities.slice(0, limit),
      from: limit,
      hasMore: entities.length > limit,
    });
  }
});

const loadMore = () => {
  State.update({
    shown: state.entities.slice(0, state.from + limit),
    from: state.from + limit,
    hasMore: state.from + limit < state.entities.length,
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
            src={`${ownerId}/widget/Entity`}
            props={{ accountId, update: props.update }}
          />
        </WidgetContainer>
      ))}
  </InfiniteScroll>
);
