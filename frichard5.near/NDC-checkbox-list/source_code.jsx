const widgetProvider = props.widgetProvider;
const { checkboxes, label, onChange } = props;

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

const handleChange = (checked, value) => {
  if (checked) {
    onChange([...selectedBoxes, e.target.value]);
    State.update({
      selectedBoxes: [...state.selectedBoxes, value],
    });
  } else {
    const selectedList = state.selectedBoxes.filter((b) => b != value);
    onChange(selectedList);
    State.update({
      selectedBoxes: [...selectedList],
    });
  }
};

return (
  <div>
    <p>{label}</p>
    {state.checkboxes.map((c) => {
      return (
        <Widget
          src={`${widgetProvider}/widget/NDC-checkbox`}
          props={{
            value: c.value,
            onChange: handleChange,
            label: c.label,
            checked: state.selectedBoxes.includes(c.value),
          }}
        />
      );
    })}
  </div>
);
