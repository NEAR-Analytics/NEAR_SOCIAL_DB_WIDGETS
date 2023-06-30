const value = props.value || "no-name button submit";
const inputSubmitLabel = props.inputSubmitLabel || "no-name default";
const callback = props.callback || (() => console.log("button clicked"));

return (
  <div class="text-muted d-flex justify-content-start align-items-center p-3">
    <div class="input-group mb-0">
      <input
        className="form-control"
        placeholder={inputSubmitLabel}
        type="text"
      />
      <Widget
        src="a_liutiev.near/widget/button_general"
        props={{ value, callback }}
      />
    </div>
  </div>
);
