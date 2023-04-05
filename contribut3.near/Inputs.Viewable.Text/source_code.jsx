const id = props.id ?? "text";
const label = props.label ?? "Input";
const value = props.value ?? "";
const link = props.link ?? "";
const isLink = link !== "";
const onSave = props.onSave ?? (() => {});

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

const LabelArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
`;

const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  gap: 0.5em;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
`;

const SaveButton = styled.button`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  background: #00ec97;
  border-radius: 50px;
  border: none;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  color: #11181c;
`;

return (
  <Container>
    <LabelArea>
      <Label htmlFor={id}>{label}</Label>
      <EditButton onClick={() => State.update({ edit: !state.edit })}>
        {state.edit ? "Cancel" : "Edit"}
      </EditButton>
    </LabelArea>

    {state.edit ? (
      <LabelArea>
        <Input
          type={isLink ? "url" : "text"}
          value={state.value}
          onChange={(e) => State.update({ value: e.target.value })}
        />
        <SaveButton show={state.edit} onClick={() => onSave(state.value)}>
          Save
        </SaveButton>
      </LabelArea>
    ) : isLink ? (
      <a href={link}>{value}</a>
    ) : (
      value
    )}
  </Container>
);
