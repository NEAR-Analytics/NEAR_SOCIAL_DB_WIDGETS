const CardContainer = styled.div`${thisWidgetStyledComponentsStyles.cardContainer}`;

const d = props.d;
const index = props.index;

const thisWidgetStyledComponentsStyles =
  props.allStyledComponentsStyles.kudoBox;
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
  return state.hoveringElement == "showCommentsButtonContainer" ||
    state.showComments
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

  styles["zIndex"] = `${
    9999999999999999999999999999999999999999999999 - index
  }`;
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
                  <div
                    className={
                      thisWidgetClassNames.allCommentAnswerBox.userAnswerHeader
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
                      style={
                        thisWidgetInlineStyles.allCommentAnswerBox
                          .commentUserNick
                      }
                      href={`#/mob.near/widget/ProfilePage?accountId=${c.accountId}`}
                    >
                      {c.accountId}
                    </a>
                    <p>I BuiDL...</p>
                  </div>
                  <b>{c.value.commentAnswer}&nbsp;&nbsp;&nbsp;</b>
                  <div
                    style={
                      props.allWidgetsInlineStyles.mainPage_post
                        .followButtonContainer
                    }
                  >
                    <Widget
                      src={`${widgetOwner}/widget/FollowButton`}
                      props={{ accountId: c.accountId }}
                    />
                  </div>
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

  styles["zIndex"] = `${
    9999999999999999999999999999999999999999999999 - index
  }`;
  return styles;
}

return (
  <>
    <CardContainer
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
          {state.showComments
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

      {RenderAllCommentAnswerBox(d)}
    </CardContainer>
  </>
);
