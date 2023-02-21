const index = {
  action: "comment",
  key: props.item,
  options: {
    limit: props.limit ?? 3,
    order: "desc",
    accountId: props.accounts,
    subscribe: props.subscribe,
  },
};

const raw = !!props.raw;

const Wrapper = styled.div`
  a {
    font-size: 14px;
    line-height: 20px;
    color: #006ADC;
    outline: none;
    font-weight: 600;

    &:hover,
    &:focus {
      color: #006ADC;
      text-decoration: underline;
    }
  }
`;

const renderItem = (a) =>
  a.value.type === "md" && (
    <div key={JSON.stringify(a)}>
      <Widget
        src="calebjacob.near/widget/Comments.Comment"
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
  <Wrapper>
    <Widget
      src="mob.near/widget/ManualIndexFeed"
      props={{
        index,
        reverse: true,
        renderItem,
        nextLimit: 10,
        loadMoreText: "Show earlier comments...",
      }}
    />
  </Wrapper>
);
