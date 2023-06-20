const item = props.item;

const Input = styled.input`
`;

const Button = styled.button`
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

State.init({
  inputValues: [""],
});

const handleInputChange = (index, value) => {
  const newInputValues = [...state.inputValues];
  newInputValues[index] = value;
  State.update({ inputValues: newInputValues });
};

const handleAddClick = () => {
  State.update({ inputValues: [...state.inputValues, ""] });
};

return (
  <Container>
    {state.inputValues?.map((inputValue, index) => (
      <Input
        key={index}
        onChange={(e) => handleInputChange(index, e.target.value)}
        value={inputValue}
        placeholder={item.name}
      />
    ))}
    <Button onClick={handleAddClick}>Add</Button>
  </Container>
);
