const { hasMore, fetchMore, cards } = props;
return (
  <InfiniteScroll loadMore={fetchMore} hasMore={hasMore} pageStart={0}>
    {cards}
  </InfiniteScroll>
);
