// State.init({
//   value: "THIS IS A BUTTON",
// });

const value = props.value || "No-name button";

return (
  <button
    class="btn btn-primary"
    onClick={() => console.log("BUTTON HAS BEEN CLICKED")}
  >
    <span>`${value}`</span>
  </button>
);
