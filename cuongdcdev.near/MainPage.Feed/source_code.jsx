const index = {
  action: "post",
  key: "main",
  options: {
    limit: 10,
    order: "desc",
    accountId: props.accounts,
  },
};

let blockedarr = props.blockedListArr ? props.blockedListArr : [];

const renderItem = (a) =>
  a.value.type === "md" && (
    <div key={JSON.stringify(a)} className="mb-3">
      <Widget
        src="cuongdcdev.near/widget/MainPage.PostPlus"
        props={{
          accountId: a.accountId,
          blockHeight: a.blockHeight,
          blockedListArr: blockedarr,
        }}
      />
    </div>
  );

return (
  <div>
    <Widget src="mob.near/widget/IndexFeed" props={{ index, renderItem }} />
  </div>
);
