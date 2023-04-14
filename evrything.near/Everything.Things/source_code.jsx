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
  if (
    a.value.type === props.type ||
    props.type === "evrything.near/type/Everything"
  ) {
    return (
      <div>
        <Widget
          src={"evrything.near/widget/Everything.View.Thing"}
          props={{
            accountId: a.accountId,
            blockHeight: a.blockHeight,
            type: a.value.type,
          }}
        />
      </div>
    );
  }
};

// <div key={JSON.stringify(a)} className="mb-3">
//   <Widget
//     src={type.widgets?.view}
//     props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
//   />
// </div>

const typeFilter =
  props.type === "evrything.near/type/Everything" ? null : props.type;

return (
  <div>
    <Widget
      src="evrything.near/widget/FilteredIndexMasonry"
      props={{ index, renderItem: renderThing, type: typeFilter }}
    />
    {props.type}
  </div>
);
