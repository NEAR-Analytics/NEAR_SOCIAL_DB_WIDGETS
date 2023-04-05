const ownerId = "contribut3.near";
const search = props.search ?? "";

State.init({
  items: [],
});

return <Widget src={`${ownerId}/widget/List`} props={{ items: state.items, createItem: (accountId) => <Widget src={`${ownerId}/widget/Project.Card`} props={{ accountId }} /> }} />
