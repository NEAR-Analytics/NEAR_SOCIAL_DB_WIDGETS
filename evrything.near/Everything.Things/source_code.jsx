const type = props.type;

if (!type) {
  return "props.type is not defined";
}

const index = {
  action: "ev01", // this could work as a sort of "domain"...
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
    console.log(a.value.type);
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
  <div>
    <Widget
      src="evrything.near/widget/FilteredIndexMasonry"
      props={{ index, renderItem: renderThing, type: typeFilter }}
    />
  </div>
);
