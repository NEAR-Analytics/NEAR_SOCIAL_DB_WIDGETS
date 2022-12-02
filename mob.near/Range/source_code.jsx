const min = props.min;
const max = props.max;
const defaultValue = props.defaultValue;

State.init({ value: defaultValue });

return (
  <div>
    <label className="form-label">
      {props.title} {state.value}
    </label>
    <input
      type="range"
      min={min}
      max={max}
      value={state.value}
      onMouseUp={(e) => {
        if (props.onMouseUp) {
          props.onMouseUp(e.target.value);
        }
        State.update({
          value: e.target.value,
        });
      }}
      onChage={(e) => {
        if (props.onChange) {
          props.onChange(e.target.value);
        }
        State.update({
          value: e.target.value,
        });
      }}
      className="form-range"
    />
  </div>
);
