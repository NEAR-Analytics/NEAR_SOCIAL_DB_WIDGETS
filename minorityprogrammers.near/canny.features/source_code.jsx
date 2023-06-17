const admins = props.admins;
const daoId = props.daoId;
const labelFilter = props.labelFilter; // pass in label
// const labelFilter = "VM";  // just to error check
// maybe add default to make it everything
// check is questions.labels // an array contains the labelFilter
const index = {
  action: "question",
  key: "minorityprogrammers",
  options: {
    limit: 30,
    order: "desc",
    accountId: props.accounts,
    // labels: labels.include(labelFilter), // debug
  },
};
// maybe check if labelFilter is not null
console.log(
  "Label filter: " + !labelFilter + "labelFilter.length: " + labelFilter.length
); // to debug
if (!labelFilter && labelFilter.length > 0) {
  // maybe overwrite the index
  index = {
    action: "question",
    key: "minorityprogrammers",
    options: {
      limit: 30,
      order: "desc",
      accountId: props.accounts,
      labels: labelFilter, // may need to do an include tag
    },
  };
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
