const ownerId = "contribut3.near";
const accountId = props.accountId;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  padding: 0.5em 0.2em;
  width: 100%;
`;

State.init({
  request: null,
  requestIsFetched: false,
});

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: accountId, cid },
    "final",
    false
  ).then((request) => State.update({ request, requedtIsFetched: true }));
}

if (!state.requesIsFetched) {
  return <>Loading...</>;
}

return (
  <Container>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "Description",
        id: "description",
        value: state.request.description,
        onSave: (description) =>
          Near.call(ownerId, "edit_request", {
            request: { ...state.request, description },
          }),
      }}
    />
  </Container>
);
