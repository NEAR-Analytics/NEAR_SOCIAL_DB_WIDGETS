const ownerId = "contribut3.near";
const search = props.search ?? "";

State.init({
  entities: [],
  shown: [],
  from: 0,
  hasMore: true,
});

Near.asyncView(ownerId, "get_entities", {}, "final", false).then((entities) =>
  State.update({
    entities: entities.sort(),
  })
);

const loadMore = () =>
  State.update({
    shown: state.entities.slice(0, state.from + limit),
    from: state.from + limit,
    hasMore: state.from + limit < state.entities.length,
  });

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
