const addressForComments = "sayalot-comments";
const addressForArticles = "sayALotArticle";
const authorForWidget = "sayalot.near";
const index = {
  action: addressForComments,
  key: props.item,
  options: {
    limit: props.limit ?? 3,
    order: "desc",
    accountId: props.accounts,
    subscribe: props.subscribe,
  },
};

const raw = !!props.raw;

const renderItem = (a) =>
  a.value.type === "md" && (
    <div key={JSON.stringify(a)}>
      <Widget
        src={`${authorForWidget}/widget/SayALot_Comment`}
        props={{
          accountId: a.accountId,
          blockHeight: a.blockHeight,
          highlight:
            a.accountId === props.highlightComment?.accountId &&
            a.blockHeight === props.highlightComment?.blockHeight,
          raw,
        }}
      />
    </div>
  );

return (
  <div>
    <Widget
      src={`${authorForWidget}/widget/SayALot_ManualIndexFeed`}
      props={{
        index,
        reverse: true,
        renderItem,
        nextLimit: 10,
        loadMoreText: "Show earlier comments...",
      }}
    />
  </div>
);
