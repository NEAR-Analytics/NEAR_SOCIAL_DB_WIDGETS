return (<Widget
  src={`${ownerId}/widget/Inputs.MultiSelect`}
  props={{
    label: "Tags",
    placeholder: "Add tags",
    options: [{ name: "wallets" }, { name: "games" }],
    value: state.tags,
    onChange: (tags) => State.update({ tags }),
  }}
/>);
