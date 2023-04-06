const id = props.id ?? "text";
const label = props.label ?? "Input";
const value = props.value ?? "";
const isLink = link !== "";
const view = props.view;
const edit = props.edit;

State.init({
  value,
  edit: false,
  change: false,
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
`;

const pushUp = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-100%);
  }
`;

const pullUp = keyframes`
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
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

  &.up {
    animation: ${pushUp} 0.2s ease-in-out forwards;

    &.reverse {
      animation: ${pushUp} 0.2s ease-in-out 0.3s backwards;
    }
  }

  &.down {
    animation: ${pullUp} 0.2s ease-in-out 0.3s forwards;

    &.reverse {
      animation: ${pullUp} 0.2s ease-in-out backwards;
    }
  }
`;

return (
  <Container>
    <Row>
      <Label htmlFor={id}>{label}</Label>
      {state.edit ? (
        <EditButton
          onClick={() => State.update({ change: true })}
          className={`down ${state.change ? "reverse" : ""}`}
          onAnimationEnd={() =>
            State.update({ change: false, edit: !state.change })
          }
        >
          Cancel
        </EditButton>
      ) : (
        <EditButton
          onClick={() => State.update({ change: true })}
          className={`up ${state.change ? "reverse" : ""}`}
          onAnimationEnd={() =>
            State.update({ change: false, edit: state.change })
          }
        >
          Edit
        </EditButton>
      )}
    </Row>

    {state.edit ? edit((value) => State.update({ value })) : view(state.value)}
  </Container>
);
