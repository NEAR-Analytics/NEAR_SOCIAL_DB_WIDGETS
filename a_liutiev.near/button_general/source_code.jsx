const value = props.value || "no-name button";
const handleSubmit =
  props.handleSubmit || (() => console.log("button clicked"));

return (
  <button class="btn btn-primary" onClick={handleSubmit}>
    {value}
  </button>
);
