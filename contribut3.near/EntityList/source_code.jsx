const ownerId = "contribut3.near";
const search = props.search ?? "";

State.init({
  entities: [],
  from: 0,
  hasMore: true,
});

const loadMore = () => {
  Near.asyncView(ownerId, "get_entities", { from: state.from, limit: 10 }).then(
    (entities) => {
      console.log(Object.keys(entities));
      State.update({
        from: state.from + 10,
        entities: [...state.entities, ...Object.keys(entities)],
        hasMore: Objet.keys(entities).length > 0,
      });
    }
  );
};

const Container = styled.div`
  margin: 0.5em 0;
`;

return (
  <InfiniteScroll loadMore={loadMore} hasMore={state.hasMore}>
    {state.entities
      .filter((accountId) => (search ? accountId.includes(search) : true))
      .map((accountId) => (
        <div key={accountId} className="mb-4">
          <Widget
            src={`${ownerId}/widget/Entity`}
            props={{ accountId, update: props.update }}
          />
        </div>
      ))}
  </InfiniteScroll>
);
