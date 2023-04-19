const ownerId = "contribut3.near";
const ids = props.ids ?? [];
const onlyOne = ids.length === 1;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: .25em;
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: .125em;
  width: 100%;
`;

State.init({
  names: null,
  namesIsFetched: false,
});

if (!state.namesIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: ids.map((id) => `${id}/profile/name`) },
    "final",
    false
  ).then((data) =>
    State.update({
      names: ids.reduce((acc, id) => ({ ...acc, [id]: data[id].profile.name }), {}),
      namesIsFetched: true,
    })
  );
}

const createItem = (accountId) => (
  <Item key={accountId}>
    <Widget src={`${ownerId}/widget/Vendor.Icon`} props={{ accountId }} />
    {onlyOne ? (
      <Widget src={`${ownerId}/widget/Vendor.NameAndAccount`} props={{ accountId, name: state.names[accountId] }} />
    ) : <></>}
  </Item>
);

return (
  <Container>
    {ids.map(createItem)}
  </Container>
);
