const { label, sendInput, placeholder, validate } = props;

State.init({
  input: "",
  error: "",
});

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
`;

const isValidDate = (dateString) => {
  var regEx = /^\d{4}\/\d{2}\/\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  return true;
};

const handleSubmit = () => {
  if (isValidDate(state.input)) {
    sendInput(state.input);
  } else {
    State.update({ error: "Date format should be YYYY/MM/DD" });
  }
};

return (
  <InputWrapper>
    {label && (
      <label style={{ color: "#8c8c8c" }} for={id}>
        {label}
      </label>
    )}
    <input
      type="text"
      placeholder="yyyy/mm/dd"
      value={state.input}
      onChange={(e) => State.update({ input: e.target.value })}
      pattern="[Bb]anana|[Cc]herry"
      required
    />
    {state.error.length ? (
      <span style={{ color: "red" }}>{state.error}</span>
    ) : (
      ""
    )}
    <button onClick={handleSubmit}>Apply</button>
  </InputWrapper>
);
