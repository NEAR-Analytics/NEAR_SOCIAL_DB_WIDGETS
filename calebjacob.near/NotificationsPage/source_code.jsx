const accountId = context.accountId;

if (!accountId) {
  return "Sign in with NEAR Wallet";
}

const index = {
  action: "notify",
  key: accountId,
  options: {
    limit: 10,
    order: "desc",
    subscribe: true,
  },
};

const Wrapper = styled.div`
  padding-bottom: 48px;
  
  > div {
    > * {
      margin-bottom: 24px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const renderItem = (item, i) => {
  if (i === 0) {
    Storage.set("lastBlockHeight", item.blockHeight);
  }
  return (
    <Widget src="calebjacob.near/widget/Notification" key={i} props={item} />
  );
};

return (
  <Wrapper>
    <Widget src="mob.near/widget/IndexFeed" props={{ index, renderItem }} />
  </Wrapper>
);
