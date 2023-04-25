const { checkboxes, label, updateChecked, selectedBoxes } = props;

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
    updateChecked([...selectedBoxes, e.target.value]);
  } else {
    const selectedList = selectedBoxes.filter((b) => b != e.target.value);
    updateChecked(selectedList);
  }
};

return (
  <Fieldset>
    <p>{label}</p>
    {state.checkboxes.map((c) => {
      console.log(c.value, c.selected);
      return (
        <label>
          <input
            className=""
            type="checkbox"
            value={c.value}
            onChange={handleChange}
            selected={c.selectedBoxes.includes(c.value)}
          />
          {c.label}
        </label>
      );
    })}
  </Fieldset>
);
