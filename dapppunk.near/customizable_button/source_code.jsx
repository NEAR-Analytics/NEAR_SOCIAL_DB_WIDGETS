// This defines the initial colors of the button
State.init({
  backgroundColor: "green",
  color: "white",
  borderColor: "green",
});

// This defines the colors when the mouse enters the button
const handleOnMouseEnter = () => {
  State.update({
    backgroundColor: "white",
    color: "green",
    borderColor: "green",
  });
};

// This defines the colors when the mouse leaves
const handleOnMouseLeave = () => {
  State.update({
    backgroundColor: "green",
    color: "white",
    borderColor: "green",
  });
};

return (
  <button
    onMouseEnter={handleOnMouseEnter}
    onMouseLeave={handleOnMouseLeave}
    style={{
      backgroundColor: state.backgroundColor,
      color: state.color,
      borderColor: state.borderColor,
    }}
  >
    Click me
  </button>
);
