const onSave = props.onSave ?? (() => { });
const ownerId = "contribut3.near";
const isAdmin = props.isAdmin;
const request = props.request;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  padding: 0.5em 0.2em;
  max-width: 100%;
`;

const Heading = styled.div`
  padding-bottom: 0.5em;
  border-bottom: 1px solid #eceef0;
  font-style: normal;
  font-weight: 600;
  font-size: 1em;
  line-height: 1.4em;
  color: #000;
  width: 100%;
`;

State.init({
  paymentSources: [],
  paymentTypes: [],
  requestTypes: [],
  isFetched: false,
});

if (!state.isFetched) {
  Near.asyncView(ownerId, "get_payment_types", {}, "final", false).then(
    (paymentTypes) =>
      State.update({
        paymentTypes: paymentTypes.map((value) => ({ value, text: value })),
      })
  );
  Near.asyncView(ownerId, "get_payment_sources", {}, "final", false).then(
    (paymentSources) =>
      State.update({
        paymentSources: paymentSources.map((value) => ({ value, text: value })),
      })
  );
  Near.asyncView(ownerId, "get_request_types", {}, "final", false).then(
    (requestTypes) =>
      State.update({
        requestTypes: requestTypes.map((value) => ({ value, text: value })),
      })
  );
  State.update({ isFetched: true });
}

return (
  <Container>
    <Heading>Request Details</Heading>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Number`}
      props={{
        label: "Budget",
        id: "bugdet",
        value: request.budget,
        onSave: (budget) => onSave({ budget }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Payment source",
        id: "source",
        value: request.source,
        options: state.paymentSources.map((value) => ({ value, text: value })),
        onSave: (source) => onSave({ source }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Payment type",
        id: "payment_type",
        value: request.payment_type,
        options: state.paymentTypes.map((value) => ({ value, text: value })),
        onSave: (payment_type) => onSave({ payment_type }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Select`}
      props={{
        label: "Request type",
        id: "request_type",
        value: request.request_type,
        options: state.requestTypes.map((value) => ({ value, text: value })),
        onSave: (request_type) => onSave({ request_type }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Date`}
      props={{
        label: "Deadline",
        id: "deadline",
        value: request.deadline,
        onSave: (deadline) => onSave({ deadline: `${new Date(deadline).getTime()}` }),
        canEdit: isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Tags`}
      props={{
        label: "Tags",
        id: "tags",
        value: Object.keys(request.tags).map((name) => ({ name })),
        options: [
          { name: "defi" },
          { name: "exchange" },
          { name: "staking" },
          { name: "farming" },
        ],
        onSave: (tags) => onSave({ tags: tags.map(({ name }) => name) }),
        canEdit: isAdmin,
      }}
    />
  </Container>
);
