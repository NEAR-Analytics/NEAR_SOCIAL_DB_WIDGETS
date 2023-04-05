const ownerId = "contribut3.near";
const search = props.search ?? "";
const items = props.items ?? [];
const createItem = props.createItem ?? (() => <></>);
const limit = 10;

State.init({
  shown: items.slice(0, limit),
  from: limit,
  hasMore: items.length > limit,
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
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }

  @media (min-width: 2560px) {
    width: 33.333%;
  }
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
