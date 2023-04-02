const accountId = props.accountId || "evrything.near";

return (
  <>
    <Widget src={"evrything.near/widget/H1"} />
    <Widget
      src={"evrything.near/widget/Everything.Things"}
      props={{
        type: state.selected,
      }}
    />
  </>
);
