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
  return (
    <>
      <p>Hello</p>
      <div>{JSON.stringify(a.value)}</div>
    </>
  );
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
      props={{ index, renderThing }}
    />
  </div>
);
