const type = props.type;

if (!type) {
  return "props.type is not defined";
}

const index = {
  action: "thing",
  key: "main",
  options: {
    limit: 10,
    order: "desc",
    accountId: props.accounts,
  },
};

const renderThing = (a) => {
  // TODO: This doesn't work because the renderItem gets cached
  if (
    a.value.type === props.type ||
    props.type === "evrything.near/type/Everything"
  ) {
    return (
      <Widget
        src={"evrything.near/widget/Everything.View.Thing"}
        props={{
          accountId: a.accountId,
          blockHeight: a.blockHeight,
          type: a.value.type,
        }}
      />
    );
  }
};

return (
  <div>
    <Widget
      src="evrything.near/widget/FilteredIndexMasonry"
      props={{ index, renderItem: renderThing }}
    />
  </div>
);
