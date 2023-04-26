const { onChange, value, label, checked } = props;

const CheckBoxWrapper = styled.div`
  display: flex;
  label {
    margin-left: 10px;
  }
  .CheckboxRoot {
    background-color: white;
    width: 25px;
    height: 25px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(68, 152, 224, 0.3);
    border-color: rgba(68, 152, 224, 1);
  }

  .CheckboxRoot:hover {
    background-color: rgba(68, 152, 224, 0.3);
  }


  .CheckboxIndicator {
    color: rgba(68, 152, 224, 1);
  }
`;

const handleChange = (value) => {
  return (checked) => {
    onChange(checked, value);
  };
};

State.update({ checked });

return (
  <CheckBoxWrapper>
    <Checkbox.Root
      className="CheckboxRoot"
      value={value}
      onCheckedChange={handleChange(value)}
      checked={state.checked}
      key={`status-checkbox-${value}`}
      id={`status-checkbox-${value}`}
    >
      <Checkbox.Indicator className="CheckboxIndicator">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </Checkbox.Indicator>
    </Checkbox.Root>
    <label htmlFor={`status-checkbox-${value}`}>{label}</label>
  </CheckBoxWrapper>
);
