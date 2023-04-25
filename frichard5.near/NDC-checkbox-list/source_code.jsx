const { checkboxes, label, onChange, selectedBoxes } = props;
console.log(checkboxes, selectedBoxes);
State.init({
  checkboxes,
  title,
});

const Input = styled.input``;
const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
`;

const handleChange = (e) => {
  if (e.target.checked) {
    onChange([...selectedBoxes, e.target.value]);
  } else {
    const selectedList = selectedBoxes.filter((b) => b != e.target.value);
    onChange(selectedList);
  }
};

return (
  <Fieldset>
    <p>{label}</p>
    {state.checkboxes.map((c) => {
      console.log(c.value, selectedBoxes.includes(c.value));
      return (
        <label>
          <input
            className=""
            type="checkbox"
            value={c.value}
            onChange={handleChange}
            selected={selectedBoxes.includes(c.value)}
          />
          {c.label}
        </label>
      );
    })}
  </Fieldset>
);
