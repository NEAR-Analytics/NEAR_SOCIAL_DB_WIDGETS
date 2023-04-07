const { hasMore, fetchMore, cards } = props;
console.log("CARDS", cards);
return (
  <>
    {cards.length && (
      <InfiniteScroll loadMore={fetchMore} hasMore={hasMore} pageStart={0}>
        {cards}
      </InfiniteScroll>
    )}
  </>
);
