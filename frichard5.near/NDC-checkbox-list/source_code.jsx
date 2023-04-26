const widgetProvider = props.widgetProvider;
const { checkboxes, label, onChange } = props;
console.log(checkboxes, selectedBoxes);
State.init({
  checkboxes,
  title,
  selectedBoxes: ["All"],
});

const Input = styled.input``;
const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
`;

const handleChange = (e) => {
  console.log(`CHECKED-${e.target.value}`, e.target.checked);
  if (e.target.checked) {
    //onChange([...selectedBoxes, e.target.value]);
    console.log("new state", [...state.selectedBoxes, e.target.value]);
    State.update({
      selectedBoxes: [...state.selectedBoxes, e.target.value],
    });
  } else {
    const selectedList = state.selectedBoxes.filter((b) => b != e.target.value);
    //onChange(selectedList);
    console.log("new state", selectedList);
    State.update({
      selectedBoxes: [...selectedList],
    });
  }
};

return (
  <div>
    <p>{label}</p>
    {state.checkboxes.map((c) => {
      console.log(c.value, state.selectedBoxes.includes(c.value));
      return (
        <Widget
          src={`${widgetProvider}/widget/NDC-checkbox`}
          props={{
            value: c.value,
            onChange: handleChange,
            label: c.label,
            checked=state.selectedBoxes.includes(value)
          }}
        />
      );
    })}
  </div>
);
