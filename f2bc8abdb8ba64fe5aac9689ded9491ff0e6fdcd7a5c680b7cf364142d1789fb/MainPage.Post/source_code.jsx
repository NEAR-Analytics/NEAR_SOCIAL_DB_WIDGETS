const updateGeneralState = props.updateGeneralState;
const thisWidgetStyledComponentsStyles =
  props.allStyledComponentsStyles.mainPage_post;
const thisWidgetInlineStyles = props.allWidgetsInlineStyles.mainPage_post;
const thisWidgetClassNames = props.allWidgetsClassNames.mainPage_post;
const standardButtonStyles = props.allWidgetsInlineStyles.standardButtonStyles;
const hoveringButtonStyles = props.allWidgetsInlineStyles.hoveringButtonStyles;

const content = props.content;
const accountId = content.accountId;
const blockHeight = parseInt(content.blockHeight);

const widgetOwner =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

State.init({
  displayCommentBox: false,
  answer: "",
  hoveringElement: "",
});

const notifyAccountId = accountId;
const item = {
  type: "social",
  path: `${accountId}/post/main`,
  blockHeight,
};

const link = `#/mob.near/widget/MainPage.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

const startCommentTo = () => {
  State.update({ displayCommentBox: !state.displayCommentBox });
};

const RenderCommentInput = (blockHeight) => {
  return state.displayCommentBox ? (
    <div
      style={thisWidgetInlineStyles.commentInput.container}
      className={thisWidgetClassNames.commentInput.container}
    >
      <textarea
        style={thisWidgetInlineStyles.commentInput.textArea}
        rows="2"
        value={state.commentTextMap[blockHeight]}
        onChange={(e) => {
          State.update({ answer: e.target.value });
        }}
      />
      <CommitButton
        style={
          state.hoveringElement == "commitCommentButton"
            ? hoveringButtonStyles
            : standardButtonStyles
        }
        data={{
          index: {
            kudo: JSON.stringify(
              {
                key: "commentAnswers",
                value: {
                  commentAnswer: state.answer,
                  blockHeight,
                },
              },
              undefined,
              0
            ),
          },
        }}
        onCommit={() => {
          let ctm = state.commentTextMap;
          ctm[blockHeight] = "";
          State.update({
            commentTextMap: ctm,
            reloadData: true,
          });
        }}
        onMouseEnter={() => {
          State.update({ hoveringElement: "commitCommentButton" });
        }}
        onMouseLeave={() => {
          State.update({ hoveringElement: "" });
        }}
      >
        Comment
      </CommitButton>
    </div>
  ) : (
    ""
  );
};

/* START KudoBox */
const CardHeader = styled.div`${thisWidgetStyledComponentsStyles.headerStyles}`;

const RenderKudoBox = (d) => {
  const text = `From @${d.accountId} Kudos ${d.value.answer} `;
  const content = { text };
  return (
    <>
      <CardHeader className={thisWidgetClassNames.headerStyles}>
        <Widget
          src="mob.near/widget/MainPage.Post.Header"
          props={{
            accountId,
            blockHeight,
            link,
            postType: "post",
            flagItem: item,
          }}
        />
        <div style={thisWidgetInlineStyles.followButtonContainer}>
          <Widget
            src={`${widgetOwner}/widget/FollowButton`}
            props={{ accountId: d.accountId }}
          />
        </div>
      </CardHeader>
      <div
        className={thisWidgetClassNames.cardContent}
        style={thisWidgetInlineStyles.cardContent}
      >
        <div style={thisWidgetInlineStyles.postContentContainer}>
          <Widget
            src="mob.near/widget/MainPage.Post.Content"
            props={{ content, raw }}
          />
        </div>
        {d.value.url != "" && d.value.url && (
          <a href={`${urlPrefix}${d.value.url}`} target="_blank">
            {d.value.url}
          </a>
        )}
        <div>
          <Widget
            src="mob.near/widget/CommentButton"
            props={{
              onClick: startCommentTo,
            }}
          />
        </div>
      </div>
      <div
        style={thisWidgetInlineStyles.upVoteContainer}
        className={thisWidgetClassNames.upVoteContainer}
      >
        <CommitButton
          style={
            state.hoveringElement == "upVoteButton"
              ? hoveringButtonStyles
              : standardButtonStyles
          }
          onMouseEnter={() => {
            State.update({ hoveringElement: "upVoteButton" });
          }}
          onMouseLeave={() => {
            State.update({ hoveringElement: "" });
          }}
          data={{
            index: {
              kudo: JSON.stringify(
                {
                  key: "upvote",
                  value: {
                    blockHeight: d.blockHeight,
                  },
                },
                undefined,
                0
              ),
            },
          }}
        >
          Upvote
        </CommitButton>
        <span style={thisWidgetInlineStyles.upVoteCounter}>
          {d.value.upvotes} {d.value.upvotes == 1 ? "upvote" : "upvotes"}
        </span>
      </div>
      {RenderCommentInput(Number(d.blockHeight))}

      {
        //RenderAllCommentAnswerBox(d)
      }
    </>
  );
};
/* END KudoBox  */

return <>{RenderKudoBox(props.content)}</>;
