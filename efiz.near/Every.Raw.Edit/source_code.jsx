const value = props.value;
const handleSubmit = props.handleSubmit;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 8px;
  font-family: monospace;
`;

const Button = styled.button`
  text-transform: lowercase !important;
`;

State.init({ value: JSON.stringify(value, null, 2) });

const handleInputChange = (event) => {
  const inputValue = event.target.value;
  try {
    const parsedValue = JSON.parse(inputValue);
    State.update({ value: inputValue });
  } catch (error) {
    // Handle invalid JSON format
    State.update({ value: inputValue });
  }
};

return (
  <>
    <TextArea value={state.value} onChange={handleInputChange} />
    <Button onClick={() => handleSubmit(state.value)}>submit</Button>
  </>
);
