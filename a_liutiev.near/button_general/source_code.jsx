const value = props.value || "no-name button";
const callback = props.callback || (() => console.log("button clicked"));

return (
  <button class="btn btn-primary" onClick={callback}>
    {value}
  </button>
);
