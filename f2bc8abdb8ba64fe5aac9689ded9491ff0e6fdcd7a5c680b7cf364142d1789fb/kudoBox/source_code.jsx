const d = props.d;
const thisWidgetInlineStyles = props.allWidgetsInlineStyles.renderKudoBox;
const thisWidgetClassNames = props.allWidgetsClassNames.renderKudoBox;

State.init({});

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
    >
      <p style={thisWidgetInlineStyles.textShowComment}>Show comments</p>
      <i className="bi bi-caret-down"></i>
    </div>

    {RenderAllCommentAnswerBox(d)}
  </div>
);
