const item = props.item;
const onChange = props.onChange;

const Input = styled.input`
`;

const Button = styled.button`
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

State.init({
  inputValues: [],
  newInputValue: "",
});

const handleInputChange = (index, value) => {
  const newInputValues = [...state.inputValues];
  newInputValues[index] = value;
  State.update({ inputValues: newInputValues });
};

const handleAddClick = () => {
  if (state.newInputValue.trim() === "") return;

  const newInputValues = [...state.inputValues, state.newInputValue];

  State.update({
    inputValues: newInputValues,
    newInputValue: "",
  });

  if (onChange) {
    onChange(newInputValues);
  }
};

const handleDeleteClick = (index) => {
  const newInputValues = [...state.inputValues];
  newInputValues.splice(index, 1);
  State.update({ inputValues: newInputValues });
  if (onChange) {
    onChange(newInputValues);
  }
};

return (
  <Container>
    {state.inputValues?.map((inputValue, index) => (
      <Row>
        <Input
          key={index}
          onChange={(e) => handleInputChange(index, e.target.value)}
          value={inputValue}
          placeholder={item.name}
        />
        <Button onClick={() => handleDeleteClick(index)}>Delete</Button>
      </Row>
    ))}
    <Row>
      <Input
        type="text"
        placeholder=""
        value={state.newInputValue}
        onChange={(e) => State.update({ newInputValue: e.target.value })}
      />
      <Button
        onClick={handleAddClick}
        disabled={state.newInputValue.trim() === ""}
      >
        Add
      </Button>
    </Row>
  </Container>
);
