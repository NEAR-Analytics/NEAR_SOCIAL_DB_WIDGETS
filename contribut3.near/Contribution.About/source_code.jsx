const ownerId = "contribut3.near";
const projectId = props.projectId;
const cid = props.cid;
const vendorId = props.vendorId;

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
  proposal: null,
  proposalIsFetched: false,
});

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_proposal",
    { project_id: projectId, cid, vendor_id: vendorId },
    "final",
    false
  ).then((proposal) => State.update({ proposal, proposalIsFetched: true }));
}

if (!state.proposalIsFetched) {
  return <>Loading...</>;
}

return (
  <Container>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.TextArea`}
      props={{
        label: "Description",
        id: "description",
        value: state.proposal.description,
        onSave: (description) =>
          Near.call(ownerId, "edit_request", {
            request: { ...state.request, description },
          }),
        canEdit: false,
      }}
    />
  </Container>
);
