const thisWidgetInlineStyles = props.thisWidgetInlineStyles;
const thisWidgetClassNames = props.thisWidgetClassNames;
const fatherStateUpdate = props.fatherStateUpdate;
const showComments = props.showComments;
const d = props.d;

State.init({
  hoveringElement: "",
});

function getCaretDirection() {
  return showComments
    ? thisWidgetInlineStyles.renderKudoBox.flipButton
    : { transition: "transform 1s" };
}

function getShowCommentsButtonContainerStyles() {
  return state.hoveringElement == "showCommentsButtonContainer" || showComments
    ? thisWidgetInlineStyles.renderKudoBox.hoveringShowCommentsButtonContainer
    : thisWidgetInlineStyles.renderKudoBox.showCommentsButtonContainer;
}

return (
  <div
    className={thisWidgetClassNames.showCommentsButtonContainer}
    style={getShowCommentsButtonContainerStyles()}
    onMouseEnter={() => {
      d.value.comments.length > 0 &&
        State.update({ hoveringElement: "showCommentsButtonContainer" });
    }}
    onMouseLeave={() => {
      d.value.comments.length > 0 && State.update({ hoveringElement: "" });
    }}
    onClick={() => {
      d.value.comments.length > 0 &&
        fatherStateUpdate({ showComments: !showComments });
    }}
  >
    <p style={thisWidgetInlineStyles.renderKudoBox.textShowComment}>
      {showComments
        ? "Hide comments"
        : d.value.comments.length > 0
        ? "Show comments"
        : "No comments"}
    </p>
    {d.value.comments.length > 0 && (
      <div style={getCaretDirection()}>
        <i className="bi bi-caret-down"></i>
      </div>
    )}
  </div>
);
