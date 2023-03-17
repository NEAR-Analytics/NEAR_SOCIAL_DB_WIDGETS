State.init({
  input: "",
  url: "",
  displayedCommentBoxes: [],
  commentTextMap: {},
  onChange: ({ content }) => {
    console.log(content);
    State.update({ content });
  },
});
const widgetOwner = "ciencia.near";
const widgetName = "Kudos";
const widgetPath = `webuidl.near/widget/${widgetName}`;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);

const card = {
  background: "linear-gradient(to right, #4deeea, #f000ff)",
  border: "1px solid black",
  borderRadius: "5px",
  textAlign: "center",
  color: "white",
  padding: "10px",
};

const button = {
  borderRadius: "5px",
  margin: "5px 0",
  padding: "8px",
  textAlign: "center",
  background: "linear-gradient(to left, #FFD50D, #4498E0)",
  border: "2px solid black",
  fontWeight: "bold",
};

const imgWH = {
  width: "25px",
  height: "25px",
};

const urlPrefix = "https://";
const accountId = props.accountId ?? "*";

const data = Social.index("kudo", "answer");
if (!data) {
  return "Loading answers";
}
const upvotes = Social.index("kudo", "upvote");
if (!upvotes) {
  return "Loading upvotes";
}

const commentAnswers = Social.index("kudo", "commentAnswers");
if (!upvotes) {
  return "Loading commentAnswers";
}

const blackList = ["webuidl.near"];
const whiteListData = data.filter((d) => !blackList.includes(d.accountId));
const whiteListComments = commentAnswers.filter(
  (d) => !blackList.includes(d.accountId)
);
let sortedData = whiteListData.sort(
  (d1, d2) => d2.blockHeight - d1.blockHeight
);

sortedData.forEach((_, i) => {
  sortedData[i].value.comments = [];
});

let upvotesMap = {};
for (let i = 0; i < upvotes.length; i++) {
  const vote = upvotes[i];
  const upvoteBlockHeight = vote.value.blockHeight;
  if (!upvotesMap[upvoteBlockHeight]) {
    upvotesMap[upvoteBlockHeight] = 0;
  }
  upvotesMap[upvoteBlockHeight] += 1;
}

whiteListComments.forEach((c) => {
  const dataIndex = sortedData.findIndex(
    (d) => d.blockHeight == c.value.blockHeight
  );
  if (dataIndex === -1) return;
  sortedData[dataIndex].value.comments.push(c);
});

const finalData = sortedData;
// console.log(3, finalData);

/* BEGIN Common.componse  */
const composeData = () => {
  const data = {
    post: {
      main: JSON.stringify(state.content),
    },
    index: {
      post: JSON.stringify({
        key: "main",
        value: {
          type: "md",
        },
      }),
    },
  };

  const item = {
    type: "social",
    path: `${context.accountId}/post/main`,
  };

  const notifications = state.extractMentionNotifications(
    state.content.text,
    item
  );

  if (notifications.length) {
    data.index.notify = JSON.stringify(
      notifications.length > 1 ? notifications : notifications[0]
    );
  }

  const hashtags = state.extractHashtags(state.content.text);

  if (hashtags.length) {
    data.index.hashtag = JSON.stringify(
      hashtags.map((hashtag) => ({
        key: hashtag,
        value: item,
      }))
    );
  }

  return data;
};

/* END Common.componse  */

/* BEGIN CommentButton  */

const startCommentTo = (blockHeight) => {
  // console.log("startCommentTo");
  let cm = state.displayedCommentBoxes;
  cm.push(blockHeight);
  cm.remove;
  State.update({ displayedCommentBoxes: cm });
};

const RenderCommentInput = (blockHeight) => {
  // console.log("RenderCommentInput");
  let cm = state.displayedCommentBoxes;
  // console.log(cm, blockHeight);
  return cm && cm.includes(blockHeight) ? (
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

/* END CommentButton  */

/* START CommentBox */
const RenderAllCommentAnswerBox = (d) => {
  return d.value.comments.map((c) => {
    return (
      <div style={{ ...card, marginLeft: "30px" }}>
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            accountId: c.accountId,
            className: "d-inline-block",
            style: { width: "1.5em", height: "1.5em" },
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

/* END CommentBox  */

/* START KudoBox */
const RenderKudoBox = (d) => {
  return (
    <>
      <div style={card}>
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            accountId: d.accountId,
            className: "d-inline-block",
            style: { width: "1.5em", height: "1.5em" },
          }}
        />
        <a href={`#/mob.near/widget/ProfilePage?accountId=${d.accountId}`}>
          {d.accountId}
        </a>
        I BuiDL... <b>{d.value.answer}&nbsp;&nbsp;&nbsp;</b>
        <b>
          <a href={`${urlPrefix}${d.value.url}`} target="_blank">
            {d.value.url}
          </a>
          &nbsp;&nbsp;&nbsp;
        </b>
        <Widget
          src="mob.near/widget/CommentButton"
          props={{
            onClick: () => startCommentTo(d.blockHeight),
          }}
        />
        <Widget
          src="mob.near/widget/FollowButton"
          props={{ accountId: d.accountId }}
        />
        {RenderCommentInput(Number(d.blockHeight))}
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
            {upvotesMap[d.blockHeight] ? upvotesMap[d.blockHeight] : 0}
          </span>
        </div>
      </div>
      {RenderAllCommentAnswerBox(d)}
    </>
  );
};
/* END KudoBox  */

return (
  <div>
    <div className="d-inline-block" style={{ width: "10em", height: "10em" }}>
      <Widget
        src="mob.near/widget/Image"
        props={{
          image: metadata.image,
          className: "w-100 h-100 shadow",
          style: { objectFit: "cover", borderRadius: "2em" },
          thumbnail: false,
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
          alt: widgetName,
        }}
      />
    </div>
    <br />
    <br />
    <p>An accolade, a Thank You, a Job Well Done. Give em a Kudo!👏 </p>
    <Widget
      src={`${widgetOwner}/widget/Common.Compose`}
      props={{
        id: "main",
        textAreaOnly: true,
        onChange: state.onChange,
        onHelper: ({ extractMentionNotifications, extractHashtags }) => {
          State.update({ extractMentionNotifications, extractHashtags });
        },
      }}
    />
    {state.content && (
      <div className="mt-3">
        <Widget
          src="mob.near/widget/MainPage.Post"
          props={{
            accountId: context.accountId,
            content: state.content,
            blockHeight: "now",
          }}
        />
      </div>
    )}
    <div className="d-flex flex-column w-75 my-3 justify-content-around">
      <p>Url:</p>
      <textarea
        style={{
          backgroundColor: "#fafafa",
          border: "1px solid #fafafa",
          borderRadius: "0.375rem",
        }}
        rows="1"
        value={state.url}
        onChange={(e) => {
          State.update({ url: e.target.value });
        }}
      />
    </div>
    <CommitButton
      style={button}
      data={{
        index: {
          kudo: JSON.stringify(
            {
              key: "answer",
              value: {
                answer: state.content.text,
                url: state.url,
              },
            },
            undefined,
            0
          ),
        },
      }}
      onCommit={() => {
        State.update({
          reloadData: true,
        });
      }}
    >
      Kudos!
    </CommitButton>
    <br />
    <br />
    <div>
      {sortedData ? sortedData.map((d) => RenderKudoBox(d)) : "Loading..."}
    </div>
  </div>
);
