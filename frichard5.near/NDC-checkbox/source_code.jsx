const { onChange, value, label } = props;

const handleChange = (e) => {
  onChange(e);
};

return (
  <div key={`status-checkbox-${value}-wrapper`}>
    <input
      key={`status-checkbox-${value}`}
      id={`status-checkbox-${value}`}
      className=""
      type="checkbox"
      value={c.value}
      onChange={handleChange}
      checked={state.selectedBoxes.includes(value)}
    />
    <label htmlFor={`status-checkbox-${value}`}>
      {label} {JSON.stringify(state.selectedBoxes.includes(value))}
    </label>
  </div>
);
