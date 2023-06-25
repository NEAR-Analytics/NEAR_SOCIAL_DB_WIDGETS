const value = props.value || "no-name button";
const handleButtonClick =
  props.handleButtonClick || (() => console.log("button clicked"));

return (
  <button class="btn btn-primary" onClick={handleButtonClick}>
    {value}
  </button>
);
