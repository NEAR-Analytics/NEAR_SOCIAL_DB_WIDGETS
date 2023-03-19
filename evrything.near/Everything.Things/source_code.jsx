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
  if (a.value.type === props.type || props.type === "everything") {
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

// <div key={JSON.stringify(a)} className="mb-3">
//   <Widget
//     src={type.widgets?.view}
//     props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
//   />
// </div>

return (
  <div>
    <Widget
      src="evrything.near/widget/FilteredIndexMasonry"
      props={{ index, renderItem: renderThing }}
    />
  </div>
);
