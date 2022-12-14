// Component that forwards key inputs to provided callback.
//
// Right now, I don't know of a better way than abusing an input field,
// because global even listeners seem not to be supported :(

// required props
const keyDownHandler = props.keyDownHandler;

// optional styling props
const width = props.width ?? "100%";
const margin = props.width ?? "0px";

return (
  <div style={{ width, margin }}>
    Click inside the text input and use arrow keys to move!
    <input type="text" onKeyDown={keyDownHandler} />
  </div>
);
