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
  if (a.value.type === props.type || a.value.type === "everything") {
    const type = Type.get(a.value.type);
    if (type === null) {
      return (
        <Widget
          src={ERROR_WIDGET}
          props={{
            message: `type: "${a.value.type}" is not valid.`,
          }}
        />
      );
    } else {
      return <Widget src={type.widgets?.view} />;
    }
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
