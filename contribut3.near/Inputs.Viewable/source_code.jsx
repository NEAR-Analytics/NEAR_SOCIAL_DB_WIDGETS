const id = props.id ?? "text";
const label = props.label ?? "Input";
const value = props.value ?? "";
const isLink = link !== "";
const view = props.view;
const edit = props.edit;

State.init({
  value,
  edit: false,
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.25em;
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  color: #11181c;
`;

const EditButton = styled.button`
  font-weight: 400;
  font-size: 0.9em;
  line-height: 1em;
  color: #006adc;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
`;

return (
  <Container>
    <Row>
      <Label htmlFor={id}>{label}</Label>
      <EditButton onClick={() => State.update({ edit: !state.edit })}>
        {state.edit ? "Cancel" : "Edit"}
      </EditButton>
    </Row>

    {state.edit ? edit : view(state.value)}
  </Container>
);
