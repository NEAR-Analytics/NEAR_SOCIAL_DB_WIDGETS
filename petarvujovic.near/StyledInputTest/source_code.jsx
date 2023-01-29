initState({
  value: "",
  value2: "",
});

const Input = styled.input`
  border: 1px solid black;
  border-radius: 6px;
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
`;

return (
  <>
    <label htmlFor="styled">Styled:</label>
    <Input
      id="styled"
      type="text"
      placeholder="Test"
      value={state.value}
      onChange={({ target }) => State.update({ value: target.value })}
    />
    <label htmlFor="regular">Regular:</label>
    <input
      id="regular"
      type="text"
      placeholder="Test2"
      value={state.value2}
      onChange={({ target }) => State.update({ value2: target.value })}
    />
  </>
);
