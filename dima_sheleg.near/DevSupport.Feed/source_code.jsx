const admins = props.admins;
const adminContract = props.adminContract;

const index = {
  action: "question",
  key: "main",
  options: {
    limit: 10,
    order: "desc",
    accountId: props.accounts,
  },
};

const renderItem = (a) => {
  if (a.value.type !== "md") {
    return;
  }

  const is_hidden = Near.view(adminContract, "is_hidden", {
    id: { account_id: a.accountId, block_height: a.blockHeight },
  });

  if (is_hidden) {
    return;
  }

  return (
    <div key={JSON.stringify(a)} className="my-4">
      <Widget
        src="dima_sheleg.near/widget/DevSupport.Question.Preview"
        props={{
          accountId: a.accountId,
          blockHeight: a.blockHeight,
          admins,
          adminContract,
        }}
      />
    </div>
  );
};

return (
  <div>
    <Widget src="mob.near/widget/IndexFeed" props={{ index, renderItem }} />
  </div>
);
