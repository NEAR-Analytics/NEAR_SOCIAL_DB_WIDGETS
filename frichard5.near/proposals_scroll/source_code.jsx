const { hasMore, fetchMore, cards } = props;
return (
  <>
    {cards.length && (
      <InfiniteScroll loadMore={fetchMore} hasMore={hasMore} pageStart={0}>
        {cards}
      </InfiniteScroll>
    )}
  </>
);
