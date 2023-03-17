const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);
const content = props.content;

State.init({
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
  State.update({ displayCommentBox: true });
};

const RenderCommentInput = (blockHeight) => {
  console.log(1, blockHeight);
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

return <>{RenderKudoBox(props.content)}</>;
