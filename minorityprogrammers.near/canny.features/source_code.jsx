const admins = props.admins;
const daoId = props.daoId;
const labelFilter = props.labelFilter; // pass in label // maybe add default to make it everything

const index = {
  action: "question",
  key: "minorityprogrammers",
  options: {
    limit: 30,
    order: "desc",
    accountId: props.accounts,
  },
};
// maybe check if labelFilter is not null
if (!labelFilter && labelFilter.length > 0) {
  // maybe overwrite the index
}

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
