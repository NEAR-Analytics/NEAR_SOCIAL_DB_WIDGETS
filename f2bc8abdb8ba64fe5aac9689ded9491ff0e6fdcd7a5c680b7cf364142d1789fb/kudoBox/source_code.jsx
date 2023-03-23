const d = props.d;
const thisWidgetInlineStyles = props.allWidgetsInlineStyles.renderKudoBox;
const thisWidgetClassNames = props.allWidgetsClassNames.renderKudoBox;
const updateGeneralState = props.updateGeneralState;
const upvotes = props.upvotes;

State.init({
  hoveringElement: "",
});

function getShowCommentsButtonContainerStyles() {
    const standardStyles = thisWidgetInlineStyles.showCommentsButtonContainer
    const hoveringStyles = standardStyles

    hoveringStyles["color"] = "rgba(0,191,255,255)";
    hoveringStyles["background-color"] = "rgba(229, 248, 255, 255)";

    return state.hoveringElement == "showCommentsButtonContainer" ? hoveringStyles : standardStyles
}

return (
  <div style={thisWidgetInlineStyles.cardContainer}>
    <Widget
      src={`${widgetOwner}/widget/MainPage.Post`}
      props={{
        content: d,
        upvotes,
        updateGeneralState,
        allWidgetsInlineStyles: props.allWidgetsInlineStyles,
        allWidgetsClassNames: props.allWidgetsClassNames,
      }}
    />

    <div
      className={thisWidgetClassNames.showCommentsButtonContainer}
      style={thisWidgetInlineStyles.showCommentsButtonContainer}
      onMouseEnter={() => {
        State.update({ hoveringElement: "showCommentsButtonContainer" });
      }}
      onMouseLeave={() => {
        State.update({ hoveringElement: "" });
      }}
    >
      <p style={thisWidgetInlineStyles.textShowComment}>Show comments</p>
      <i className="bi bi-caret-down" styles={state.hoveringElement == "showCommentsButtonContainer" ? thisWidgetInlineStyles.}></i>
    </div>

    {RenderAllCommentAnswerBox(d)}
  </div>
);
