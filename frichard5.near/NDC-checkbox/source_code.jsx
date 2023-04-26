const { onChange, value, label, checked } = props;

const handleChange = (e) => {
  onChange(e);
};

State.update({ checked });
console.log(label, checked);
return (
  <div key={`status-checkbox-${value}-wrapper`}>
    <input
      key={`status-checkbox-${value}`}
      id={`status-checkbox-${value}`}
      className=""
      type="checkbox"
      value={value}
      onChange={handleChange}
      checked={state.checked}
    />
    <label htmlFor={`status-checkbox-${value}`}>
      {label} {JSON.stringify(checked)}
    </label>
  </div>
);
