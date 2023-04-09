const type = props.type;
const domain = props.domain || "everything";

if (!type) {
  return "props.type is not defined";
}

const index = {
  action: domain, // this could work as a sort of "domain"... ev02
  key: "main",
  options: {
    limit: 10,
    order: "desc",
  },
};

const renderThing = (a) => {
  if (a.value.type === type || type === "evrything.near/type/Everything") {
    // check for modification
    // see Everything.View.Thing to see the delete function
    // but since we can't actually delete the data,
    // we will check if this blockheight has been modified/hid
    const mod = JSON.parse(
      Social.get(`${a.accountId}/modification/${a.blockHeight}`) || "null"
    );
    // if it has been modified with a hide, then return null
    if (mod && mod.action === "HIDE") {
      return null;
    }
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

return (
  <Widget
    src="evrything.near/widget/FilteredIndexMasonry"
    props={{ index, renderItem: renderThing }}
  />
);
