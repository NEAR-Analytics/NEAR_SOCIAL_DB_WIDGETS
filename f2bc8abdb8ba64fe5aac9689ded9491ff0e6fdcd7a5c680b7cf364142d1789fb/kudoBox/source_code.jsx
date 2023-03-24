const d = props.d;
const thisWidgetInlineStyles = props.allWidgetsInlineStyles.kudos;
const thisWidgetClassNames = props.allWidgetsClassNameskudos;
const updateGeneralState = props.updateGeneralState;
const upvotes = props.upvotes;

State.init({
  hoveringElement: "",
  showComments: false,
});

const widgetOwner = props.widgetOwner;

function getShowCommentsButtonContainerStyles() {
  return state.hoveringElement == "showCommentsButtonContainer"
    ? thisWidgetInlineStyles.renderKudoBox.hoveringShowCommentsButtonContainer
    : thisWidgetInlineStyles.renderKudoBox.showCommentsButtonContainer;
}

function getCaretDirection() {
  return state.showComments
    ? thisWidgetInlineStyles.renderKudoBox.flipButton
    : {};
}

const RenderAllCommentAnswerBox = (d) => {
  return d.value.comments.map((c) => {
    return (
      <div style={thisWidgetInlineStyles.allCommentAnswerBox.container}>
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            accountId: c.accountId,
            className: "d-inline-block",
            style:
              thisWidgetInlineStyles.allCommentAnswerBox.profileImageStyles,
          }}
        />
        <a href={`#/mob.near/widget/ProfilePage?accountId=${c.accountId}`}>
          {c.accountId}
        </a>
        I BuiDL... <b>{c.value.commentAnswer}&nbsp;&nbsp;&nbsp;</b>
        <Widget
          src="mob.near/widget/FollowButton"
          props={{ accountId: c.accountId }}
        />
      </div>
    );
  });
};

return (
  <div
    style={thisWidgetInlineStyles.renderKudoBox.cardContainer}
    className={thisWidgetClassNames.renderKudoBox.cardContainer}
  >
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
      style={getShowCommentsButtonContainerStyles()}
      onMouseEnter={() => {
        State.update({ hoveringElement: "showCommentsButtonContainer" });
      }}
      onMouseLeave={() => {
        State.update({ hoveringElement: "" });
      }}
      onClick={() => {
        State.update({ showComments: !state.showComments });
      }}
    >
      <p style={thisWidgetInlineStyles.renderKudoBox.textShowComment}>
        Show comments
      </p>
      <i className="bi bi-caret-down" style={getCaretDirection()}></i>
    </div>

    {RenderAllCommentAnswerBox(d)}
  </div>
);
