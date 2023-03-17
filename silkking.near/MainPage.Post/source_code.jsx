const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/main`, blockHeight) ?? "null");
const subscribe = !!props.subscribe;
const raw = !!props.raw;

State.init({
  displayedCommentBoxes: props.displayedCommentBoxes,
  displayCommentBox: false,
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

const startCommentTo = () => {
  // let cm = state.displayedCommentBoxes;
  // cm.push(blockHeight);
  // console.log("startCommentTo");
  // State.update({ displayedCommentBoxes: cm });
  State.update({ displayCommentBox: true });
};

const RenderCommentInput = (blockHeight) => {
  // console.log("RenderCommentInput");
  console.log(1, blockHeight);
  let cm = state.displayedCommentBoxes;
  // console.log(cm, blockHeight);
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
          const cm = state.commentTextMap;
          // console.log(cm[blockHeight]);
          cm[blockHeight] = e.target.value;
          State.update({ commentTextMap: cm });
          //   state.commentTextMap[blockHeight] = e.target.value;
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
                  commentAnswer: state.commentTextMap[blockHeight],
                  blockHeight: blockHeight,
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
        Comment 1
      </CommitButton>
    </div>
  ) : (
    ""
  );
};

/* START KudoBox */
const RenderKudoBox = (d) => {
  const text = `@${d.accountId} I BuiDL... ${d.value.answer} `;
  const content = { text };
  return (
    <>
      <div style={card}>
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
        <div className="mt-3 text-break" style={cardContent}>
          <Widget
            src="mob.near/widget/MainPage.Post.Content"
            props={{ content, raw }}
          />
          {
            // <a href={`#/mob.near/widget/ProfilePage?accountId=${d.accountId}`}>
            //   {d.accountId}
            // </a>
            // I BuiDL... <b>{d.value.answer}&nbsp;&nbsp;&nbsp;</b>
            // <b>
            //   <a href={`${urlPrefix}${d.value.url}`} target="_blank">
            //     {d.value.url}
            //   </a>
            //   &nbsp;&nbsp;&nbsp;
            // </b>
          }
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
          <Widget
            src="mob.near/widget/FollowButton"
            props={{ accountId: d.accountId }}
          />

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
            Upvote 1
          </CommitButton>
          <span>
            {upvotesMap[d.blockHeight] ? upvotesMap[d.blockHeight] : 0} upvotes
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

return (
  <>
    {RenderKudoBox(props.d)}
    <div className="border rounded-4 p-3 pb-1">
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
      <div className="mt-3 text-break">
        <Widget
          src="mob.near/widget/MainPage.Post.Content"
          props={{ content, raw }}
        />
      </div>
      {blockHeight !== "now" && (
        <div className="mt-1 d-flex justify-content-between">
          <div>
            <span className="me-4">
              <Widget
                src="mob.near/widget/LikeButton"
                props={{
                  notifyAccountId,
                  item,
                }}
              />
            </span>
            <Widget
              src="mob.near/widget/CommentButton"
              props={{
                onClick: () =>
                  !state.showReply && State.update({ showReply: true }),
              }}
            />
          </div>
          <div>
            <Widget
              src="mob.near/widget/MainPage.Post.ShareButton"
              props={{ accountId, blockHeight, postType: "post" }}
            />
          </div>
        </div>
      )}
      <div className="mt-3 ps-5">
        {state.showReply && (
          <div className="mb-2">
            <Widget
              src="mob.near/widget/MainPage.Comment.Compose"
              props={{
                notifyAccountId,
                item,
                onComment: () => State.update({ showReply: false }),
              }}
            />
          </div>
        )}
        <Widget
          src="mob.near/widget/MainPage.Comment.Feed"
          props={{
            item,
            highlightComment: props.highlightComment,
            limit: props.commentsLimit,
            subscribe,
            raw,
          }}
        />
      </div>
    </div>
  </>
);
