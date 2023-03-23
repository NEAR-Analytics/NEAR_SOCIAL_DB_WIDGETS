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
  const standardStyles =
    thisWidgetInlineStyles.renderKudoBox.showCommentsButtonContainer;
  const hoveringStyles = standardStyles;

  hoveringStyles["color"] = "rgba(0,191,255,255)";
  hoveringStyles["background-color"] = "rgba(229, 248, 255, 255)";

  console.log(hoveringStyles);

  return state.hoveringElement == "showCommentsButtonContainer"
    ? hoveringStyles
    : standardStyles;
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
      <i
        className="bi bi-caret-down"
        styles={
          state.hoveringElement == "showCommentsButtonContainer" &&
          thisWidgetInlineStyles.renderKudoBox.flipButton
        }
      ></i>
    </div>

    {RenderAllCommentAnswerBox(d)}
  </div>
);
