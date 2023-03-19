const type = props.type;

if (!type) {
  return "props.type is not defined";
}

const index = {
  action: "everything-v0", // this could work as a sort of "domain" if we want...
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

const typeFilter =
  props.type === "evrything.near/type/Everything" ? null : props.type;

return (
  <div>
    <Widget
      src="evrything.near/widget/FilteredIndexMasonry"
      props={{ index, renderItem: renderThing, type: typeFilter }}
    />
  </div>
);
