const index = {
  action: "post",
  key: "insta",
  options: {
    limit: 3,
    order: "desc",
    accountId: props.accounts,
  },
};

const renderItem = (a) =>
  a.value.type === "insta" && (
    <Widget
      key={JSON.stringify(a)}
      src="mob.near/widget/Insta.Post"
      props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
    />
  );

const LoadMore = styled.div`
  @media (min-width: 576px) {
    max-width: 288px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

return (
  <Widget
    src="mob.near/widget/FilteredIndexFeed"
    props={{
      index,
      renderItem,
      manual: true,
      loadMoreText: (
        <LoadMore className="text-bg-light ratio ratio-1x1">Load More</LoadMore>
      ),
    }}
  />
);
