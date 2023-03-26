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

function getAnswersContainerStyles() {
  let styles = thisWidgetInlineStyles.allCommentAnswerBox.cardsContainer;

  styles["zIndex"] = `${
    99999999999999999999999999999999999999999999999 - index
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

function updateStateFunction(objetc) {
  State.update(objetc);
}

const CardContainer = styled.div`${thisWidgetStyledComponentsStyles.cardContainer}`;

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

      <Widget
        src={`${widgetOwner}/widget/showCommentsButton`}
        props={{
          thisWidgetInlineStyles,
          thisWidgetClassNames,
          fatherStateUpdate: updateStateFunction,
          showComments: state.showComments,
          d,
        }}
      />

      {RenderAllCommentAnswerBox(d)}
    </CardContainer>
  </>
);
