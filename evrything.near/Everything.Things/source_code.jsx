const type = props.type;

if (!type) {
  return "props.type is not defined";
}

const index = {
  action: "ev02", // this could work as a sort of "domain"... ev02
  key: "main",
  options: {
    limit: 10,
    order: "desc",
  },
};

const renderThing = (a) => {
  if (
    a.value.type === props.type ||
    props.type === "evrything.near/type/Everything"
  ) {
    // check for modification
    return (
      <Widget
        src={"evrything.near/widget/Everything.Summary.Thing"}
        props={{
          accountId: a.accountId,
          blockHeight: a.blockHeight,
          type: a.value.type,
        }}
      />
    );
  }
};

const typeFilter = props.type !== "evrything.near/type/Everything";

return (
  <Widget
    src="evrything.near/widget/FilteredIndexMasonry"
    props={{ index, renderItem: renderThing, type: typeFilter }}
  />
);
