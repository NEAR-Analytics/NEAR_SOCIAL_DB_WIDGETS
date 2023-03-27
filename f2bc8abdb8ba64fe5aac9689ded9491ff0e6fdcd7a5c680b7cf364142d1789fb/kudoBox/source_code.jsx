const d = props.d;
const index = props.index;

const tabs = props.tabs;
const oppenedTab = props.oppenedTab;

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

  styles["zIndex"] = `${999999999 - index}`;
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
                    oppenedTab == tabs.KUDO.id
                      ? thisWidgetClassNames.allCommentAnswerBox
                          .cardContainerSingleCard
                      : thisWidgetClassNames.allCommentAnswerBox.cardContainer
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
                  <b style={thisWidgetInlineStyles.allCommentAnswerBox.comment}>
                    {c.value.commentAnswer}&nbsp;&nbsp;&nbsp;
                  </b>
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

  styles["zIndex"] = `${999999999 - index}`;
  return styles;
}

function updateStateFunction(objetc) {
  State.update(objetc);
}

return (
  <>
    <div
      style={getKudoBoxContainerStyles()}
      className={
        oppenedTab == tabs.ALL_kUDOS.id
          ? thisWidgetClassNames.renderKudoBox.cardContainer
          : thisWidgetClassNames.renderKudoBox.cardContainerSingleCard
      }
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
    </div>
  </>
);
