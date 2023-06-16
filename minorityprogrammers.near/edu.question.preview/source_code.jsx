const admins = props.admins;
const daoId = props.daoId;

const index = {
  action: "question",
  key: "minorityprogrammers",
  options: {
    limit: 20,
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
        src="minorityprogrammers.near/widget/canny.post.preview"
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

return <Widget src="mob.near/widget/IndexFeed" props={{ index, renderItem }} />;
