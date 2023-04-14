const accountId = props.accountId || "evrything.near";

const types = Social.keys(`${accountId}/type/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

// All types from every account
// const data = Social.keys("*/type/*");

types = Object.entries(types[accountId].type ?? {});

State.init({
  selected: `${accountId}/type/Image`,
});

const setSelected = (selection) => {
  State.update({
    selected: selection,
  });
};

return (
  <>
    <Widget
      src={"evrything.near/widget/Everything.Search"}
      props={{
        accountId: accountId,
        selected: state.selected,
        setSelected: setSelected,
        options: types,
      }}
    />
    <Widget
      src={"evrything.near/widget/Everything.Things"}
      props={{
        type: state.selected,
      }}
    />
  </>
);
