const ownerId = "contribut3.near";
const accountId = props.accountId ?? context.accountId;
const size = props.size ?? "1em";

State.init({
  name: "",
  nameIsFetched: false,
});

if (!state.nameIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/name`] },
    "final",
    false,
  ).then((name) => State.update({ name: name[accountId].profile.name, nameIsFetched: true }));
  return <>Loading...</>;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
`;

return (
  <Container>
    <Widget
      src={`${ownerId}/widget/Project.Icon`}
      props={{ accountId, size }}
    />
    {state.name}
    @{accountId}
  </Container>
)
