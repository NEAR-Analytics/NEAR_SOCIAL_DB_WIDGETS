const handleOnMouseEnter = () => {
  State.update({ show: true });
};
const handleOnMouseLeave = () => {
  State.update({ show: false });
};

State.init({
  show: false,
});

const overlay = (
  <div
    className="border m-3 p-3 rounded-4 bg-white shadow"
    style={{ maxWidth: "20em" }}
    onMouseEnter={handleOnMouseEnter}
    onMouseLeave={handleOnMouseLeave}
  >
    <Widget
      src="mob.near/widget/Profile.Popover"
      props={{ accountId: props.accountId }}
    />
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
    <span onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
      <button>test {props.children}</button>
    </span>
  </OverlayTrigger>
);
