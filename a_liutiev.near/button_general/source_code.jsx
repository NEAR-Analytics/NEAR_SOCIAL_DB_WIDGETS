// State.init({
//   value: "THIS IS A BUTTON",
// });

const value = props.value || "No-name button";
const callback =
  props.callback || (() => console.log("BUTTON HAS BEEN CLICKED"));

return (
  <button class="btn btn-primary" onClick={callback}>
    {value}
  </button>
);
