const updateGeneralState = props.updateGeneralState;
const thisWidgetInlineStyles = props.allWidgetsInlineStyles;
const thisWidgetClassNames = props.allWidgetsClassNames;

const content = props.content;
const accountId = content.accountId;
const blockHeight = parseInt(content.blockHeight);

State.init({
  displayCommentBox: false,
  answer: "",
});

const notifyAccountId = accountId;
const item = {
  type: "social",
  path: `${accountId}/post/main`,
  blockHeight,
};

const link = `#/mob.near/widget/MainPage.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

const card = {
  background: "linear-gradient(to right, #4deeea, #f000ff)",
  border: "1px solid black",
  borderRadius: "5px",
  textAlign: "center",
  color: "white",
  padding: "10px",
};

const cardContent = {
  display: "grid",
  gridTemplateColumns: "3fr 1fr 1fr",
};

const headerStyles = {
  display: "flex",
  justifyContent: "center",
};

const startCommentTo = () => {
  State.update({ displayCommentBox: true });
};

const RenderCommentInput = (blockHeight) => {
  return state.displayCommentBox ? (
    <div
      style={{
        margin: "10px 0px",
      }}
    >
      <textarea
        style={{
          backgroundColor: "rgb(230, 230, 230)",
          border: "1px solid #ced4da",
          borderRadius: "0.375rem",
          width: "50%",
          verticalAlign: "middle",
        }}
        rows="2"
        value={state.commentTextMap[blockHeight]}
        onChange={(e) => {
          State.update({ answer: e.target.value });
        }}
      />
      <CommitButton
        style={button}
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
      >
        Comment
      </CommitButton>
    </div>
  ) : (
    ""
  );
};

/* START KudoBox */
const RenderKudoBox = (d) => {
  const text = `From @${d.accountId} Kudos ${d.value.answer} `;
  const content = { text };
  return (
    <>
      <div style={card}>
        <div style={headerStyles}>
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
          <Widget
            src="mob.near/widget/FollowButton"
            props={{ accountId: d.accountId }}
          />
        </div>
        <div className="mt-3 text-break" style={cardContent}>
          <Widget
            src="mob.near/widget/MainPage.Post.Content"
            props={{ content, raw }}
          />
          <a href={`${urlPrefix}${d.value.url}`} target="_blank">
            {d.value.url}
          </a>
          <div>
            <Widget
              src="mob.near/widget/CommentButton"
              props={{
                onClick: startCommentTo,
              }}
            />
          </div>
        </div>
        <div>
          <CommitButton
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
          <span>
            {d.value.upvotes} {d.value.upvotes == 1 ? "upvote" : "upvotes"}
          </span>
        </div>
        {RenderCommentInput(Number(d.blockHeight))}
      </div>

      {
        //RenderAllCommentAnswerBox(d)
      }
    </>
  );
};
/* END KudoBox  */

return <>{RenderKudoBox(props.content)}</>;
