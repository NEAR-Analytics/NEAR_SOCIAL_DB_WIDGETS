const value = props.value || "no-name button submit";
const inputSubmitLabel = props.inputSubmitLabel || "no-name default";
const handleButtonClick =
  props.handleButtonClick || (() => console.log("button clicked"));
const handleInputChange = props.handleInputChange;

return (
  <div class="text-muted d-flex justify-content-start align-items-center p-3">
    <div class="input-group mb-0">
      <input
        className="form-control"
        placeholder={inputSubmitLabel}
        type="text"
        onChange={handleInputChange}
        required
      />
      <Widget
        src="a_liutiev.near/widget/button_general"
        props={{ value, handleButtonClick }}
      />
    </div>
  </div>
);
