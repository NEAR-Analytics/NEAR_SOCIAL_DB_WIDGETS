State.init({
  show: false,
});

const handleOnMouseEnter = () => {
  State.update({ show: true });
};
const handleOnMouseLeave = () => {
  State.update({ show: false });
};

const overlay = (
  <div
    className="border m-3 p-3 rounded-4 bg-white shadow"
    style={{ maxWidth: "24em", zIndex: 1070 }}
    onMouseEnter={handleOnMouseEnter}
    onMouseLeave={handleOnMouseLeave}
  >
    This is the overlay Message
  </div>
);

return (
  <OverlayTrigger
    show={state.show}
    trigger={["hover", "focus"]}
    delay={{ show: 250, hide: 300 }}
    placement="auto"
    overlay={overlay}
  >
    <span
      className="d-inline-flex"
      style={{ backgroundColor: "gray", borderRadius: "10px", padding: "10px" }}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      Place Mouse Over Me
    </span>
  </OverlayTrigger>
);
