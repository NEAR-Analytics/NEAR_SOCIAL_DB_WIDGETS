const ownerId = "contribut3.near";

State.init({
  requestId: [],
  message: "",
  requests: [],
  requestsIsFetched: false,
});

if (!state.requestsIsFetched) {
  Near.asyncView(
    ownerId,
    "get_admin_requests",
    { account_id: context.accountId },
    "final",
    false,
  ).then((requests) => State.update({ requests, requestsIsFetched: true }));
  return <>Loading...</>;
}

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
`;

return (<Form>
  <Widget
    src={`${ownerId}/widget/Inputs.Select`}
    props={{
      label: "Contribution to *",
      options: requests,
      value: state.requestId,
      onChange: (requestId) => State.update({ requestId }),
    }}
  />
  <Widget
    src={`${ownerId}/widget/Inputs.TextArea`}
    props={{
      label: "Message",
      placeholder: "Describe the contribution you would like to request",
      value: state.message,
      onChange: (message) => State.update({ message }),
    }}
  />
</Form>);
