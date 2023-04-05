const ownerId = "contribut3.near";
const search = props.search ?? "";
const items = props.items ?? [];
const createItem = props.createItem ?? (() => <></>);
const limit = 10;

State.init({
  shown: [],
  from: 0,
  hasMore: true,
});

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
      .map((args, index) => (
        <WidgetContainer key={index}>
          {createItem(args)}
        </WidgetContainer>
      ))}
  </InfiniteScroll>
);
