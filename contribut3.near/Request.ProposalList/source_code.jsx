const ownerId = "contribut3.near";
const search = props.search ?? "";
const cid = props.cid;
const accountId = props.accountId;

State.init({
  items: [],
  itemsIsFetched: false,
});

if (!state.itemsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request_proposals",
    { account_id: accountId, cid },
    "final",
    false
  ).then((items) => State.update({ items, itemsIsFetched: true }));

  return <>Loading...</>;
}

return (
  <Widget
    src={`${ownerId}/widget/List`}
    props={{
      search,
      items: state.items,
      createItem: ([[projectId, cid], vendorId]) => (
        <Widget
          src={`${ownerId}/widget/Proposal.AdminCard`}
          props={{ projectId, cid, vendorId }}
        />
      ),
    }}
  />
);
