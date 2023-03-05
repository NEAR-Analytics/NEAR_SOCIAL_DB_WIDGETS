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
    style={{
      maxWidth: "24em",
      zIndex: 1070,

      width: 150,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "#c3cbd4",
      textAlign: "left",
      borderRadius: 4,
      padding: "5px 10px",

      fontSize: "0.9rem",
    }}
    onMouseEnter={handleOnMouseEnter}
    onMouseLeave={handleOnMouseLeave}
  >
    {!item.empty && (
      <span>
        {props.item.value} commits in {props.date}
      </span>
    )}
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
    <div
      className="contributionItem"
      style={{
        borderRadius: 2,
        backgroundColor: props.item?.empty
          ? "rgba(256,256,256,.05)"
          : props.color,
        aspectRatio: 1 / 1,
        maxWidth: 20,
        maxHeight: 20,
      }}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    />
  </OverlayTrigger>
);
