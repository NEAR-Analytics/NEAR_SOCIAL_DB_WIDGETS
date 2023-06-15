const index = {
  action: "project",
  key: "nyc",
  options: {
    limit: 9,
    order: "asc",
    accountId: props.accounts,
  },
};

const renderItem = (a) => {
  if (a.value.type !== "md") {
    return;
  }

  return (
    <div key={JSON.stringify(a)} className="my-4">
      <Widget
        src="nycdao.near/widget/project.view"
        props={{
          accountId: a.accountId,
          blockHeight: a.blockHeight,
        }}
      />
    </div>
  );
};

return <Widget src="mob.near/widget/IndexFeed" props={{ index, renderItem }} />;
