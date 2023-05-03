const { label, sendInput, placeholder, validate } = props;
const buttonLabel = props.buttonLabel || "Apply";

State.init({
  input: "",
  error: "",
});

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
`;

const getValidate = (validate) => {
  switch (validate) {
    case "date":
      return /^\d{4}\/\d{2}\/\d{2}$/;
    default:
      return "";
  }
};

const isValidDate = (dateString) => {
  var regEx = getValidate(validate);
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
      placeholder={placeholder}
      value={state.input}
      onChange={(e) => State.update({ input: e.target.value })}
    />
    {state.error.length ? (
      <span style={{ color: "red" }}>{state.error}</span>
    ) : (
      ""
    )}
    <button style={{ marginLeft: "0px" }} onClick={handleSubmit}>
      {buttonLabel}
    </button>
  </InputWrapper>
);
