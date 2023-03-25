const d = props.d;
const index = props.index;
const thisWidgetInlineStyles = props.allWidgetsInlineStyles.kudos;
const thisWidgetClassNames = props.allWidgetsClassNames.kudos;
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
    : { transition: "transform 1s" };
}

function getAnswersContainerStyles() {
  let styles = thisWidgetInlineStyles.allCommentAnswerBox.cardsContainer;

  //I use 1070 because it's the z-index the current popus have. Might be good idea to review this in a future.
  styles["zIndex"] = `${1070 - index}`;
  return styles;
}

const RenderAllCommentAnswerBox = (d) => {
  return (
    <>
      {state.showComments && (
        <div style={getAnswersContainerStyles()}>
          {d.value.comments.map((c) => {
            return (
              <>
                <div
                  style={
                    thisWidgetInlineStyles.allCommentAnswerBox.cardContainer
                  }
                  className={
                    thisWidgetClassNames.allCommentAnswerBox.cardContainer
                  }
                >
                  <Widget
                    src="mob.near/widget/ProfileImage"
                    props={{
                      accountId: c.accountId,
                      className: "d-inline-block",
                      style:
                        thisWidgetInlineStyles.allCommentAnswerBox
                          .profileImageStyles,
                    }}
                  />
                  <a
                    href={`#/mob.near/widget/ProfilePage?accountId=${c.accountId}`}
                  >
                    {c.accountId}
                  </a>
                  I BuiDL... <b>{c.value.commentAnswer}&nbsp;&nbsp;&nbsp;</b>
                  <Widget
                    src="mob.near/widget/FollowButton"
                    props={{ accountId: c.accountId }}
                  />
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

function getKudoBoxContainerStyles() {
  let styles = thisWidgetInlineStyles.renderKudoBox.cardContainer;

  //I use 1070 because it's the z-index the current popus have. Might be good idea to review this in a future.
  styles["zIndex"] = `${1070 - index}`;
  return styles;
}

return (
  <div
    style={getKudoBoxContainerStyles()}
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
        d.value.comments.length > 0 &&
          State.update({ hoveringElement: "showCommentsButtonContainer" });
      }}
      onMouseLeave={() => {
        d.value.comments.length > 0 && State.update({ hoveringElement: "" });
      }}
      onClick={() => {
        d.value.comments.length > 0 &&
          State.update({ showComments: !state.showComments });
      }}
    >
      <p style={thisWidgetInlineStyles.renderKudoBox.textShowComment}>
        {d.value.comments.length < 0
          ? "No comments"
          : state.showComments
          ? "Hide comments"
          : "Show comments"}
      </p>
      {d.value.comments.length > 0 && (
        <div style={getCaretDirection()}>
          <i className="bi bi-caret-down"></i>
        </div>
      )}
    </div>

    {RenderAllCommentAnswerBox(d)}
  </div>
);
