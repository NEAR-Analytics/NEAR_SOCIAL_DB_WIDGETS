//--------------------------------------Start get props-----------------------------------------------------------------
const cardData = props.cardData ?? {
  accountId: "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
  blockHeight: 83806538,
  value: {
    isDraft: false,
    title: "Last test?",
    description: "Is this the last test?",
    tgLink: "",
    startTimestamp: 1674701520000,
    endTimestamp: 1674787920000,
    questions: [
      {
        question: "What do you think?",
        questionType: "0",
        choicesOptions: ["Yes", "No"],
      },
      {
        question: "Why?",
        questionType: "1",
        choicesOptions: [
          "Because it can't be other way",
          "Because i'm sure",
          "Why not?",
        ],
      },
      {
        question: "Multiselect?",
        questionType: "2",
        choicesOptions: ["1", "2", "3"],
      },
      {
        question: "Give me a feedback",
        questionType: "3",
        choicesOptions: [],
      },
    ],
    timestamp: 1674701636048,
  },
};

const footerFormat = props.footerFormat ?? {
  comment: {
    status: true,
    key: "kudo",
    path: "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/Kudos",
    pushDataModel:
      '{"kudo":"{\\"key\\":\\"commentAnswers\\",\\"value\\":{\\"commentAnswer\\":\\"\\",\\"blockHeight\\":0}}"}',
  },
  repost: {
    status: true,
  },
  upVoteButton: {
    status: true,
    pushDataModel:
      '{"kudo":"{\\"key\\":\\"upvote\\",\\"value\\":{\\"blockHeight\\":0}}"}',
  },
  shareWidget: {
    status: true,
    popUpDescription: "Use this link to share the kudo",
    shareingWidget: "Kudos.Styles",
    propName: "sharedBlockHeight",
  },
};

//---------------------------------------End get props------------------------------------------------------------------

//--------------------------------------Start consts-----------------------------------------------------------------
const widgetOwner =
  props.widgetOwner ??
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

let item = {
  type: "social",
  path: `${cardData.accountId}/post/main`,
  blockHeight: cardData.blockHeight,
};

const reposts = Social.index("repost", item);

const repostsByUsers = Object.fromEntries(
  (reposts || [])
    .filter((repost) => repost.value.type === "repost")
    .map((repost) => [repost.accountId, repost])
);

if (state.hasRepost === true) {
  repostsByUsers[context.accountId] = {
    accountId: context.accountId,
  };
}

const hasRepost = context.accountId && !!repostsByUsers[context.accountId];

//---------------------------------------End consts------------------------------------------------------------------

//--------------------------------------Start styles-----------------------------------------------------------------
const repostSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="currentColor"
    viewBox="0 0 24 24"
    style={{
      marginTop: "-0.2em",
    }}
  >
    <path
      fill-rule="evenodd"
      d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
      transform="rotate(180, 12, 12), translate(0, 4)"
    />
    <path
      fill-rule="evenodd"
      d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
      transform="translate(0, 4)"
    />
  </svg>
);

const hoveringButtonStyles = {
  border: "2px solid black",
  color: "black",
  backgroundColor: "white",
  fontWeight: "500",
  fontSize: font_big,
  padding: "0.3rem 0.5rem",
  borderRadius: "12px",
  textDecoration: "none",
  margin: "0 1rem",
};

const standardButtonSyles = {
  border: "2px solid transparent",
  fontWeight: "500",
  fontSize: font_big,
  padding: "0.3rem 0.5rem",
  backgroundColor: "#010A2D",
  borderRadius: "12px",
  color: "white",
  textDecoration: "none",
  margin: "0 1rem",
};

const standardButtonStylesWithoutMargin = {
  border: "2px solid transparent",
  fontWeight: "500",
  fontSize: font_big,
  padding: "0.3rem 0.5rem",
  backgroundColor: "#010A2D",
  borderRadius: "12px",
  color: "white",
  textDecoration: "none",
};

const hoveringButtonStylesWithoutMargin = {
  border: "2px solid black",
  color: "black",
  backgroundColor: "white",
  fontWeight: "500",
  fontSize: font_big,
  padding: "0.3rem 0.5rem",
  borderRadius: "12px",
  textDecoration: "none",
};

const repostButton = {
  border: "0",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  width: "2.5em",
  height: "2.5em",
  fill: "currentColor",
};

const repostButtonHovering = {
  border: "0",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  width: "2.5em",
  height: "2.5em",
  fill: "currentColor",
  color: "rgb(0, 184, 124)",
  background: "rgb(0, 184, 124, 0.1)",
};

const textAreaStyle = {
  backgroundColor: "rgb(230, 230, 230)",
  border: "1px solid #ced4da",
  borderRadius: "0.375rem",
  width: "100%",
  verticalAlign: "middle",
  marginBottom: "0.5rem",
};
//---------------------------------------End styles------------------------------------------------------------------

//--------------------------------------Start functions-----------------------------------------------------------------
State.init({ hoveringElement: "", displayCommentBox: false });

function startCommentTo() {
  State.update({ displayCommentBox: !state.displayCommentBox });
}

function getRepostCommentCallData() {
  return {
    key: footerFormat.comment.key,
    value: {
      type: "repost",
      item: {
        type: "social",
        path: footerFormat.comment.path,
        blockHeight: cardData.blockHeight,
      },
    },
  };
}

function getVoteUpButtonCommentCallData() {
  let pushDataModel = JSON.parse(footerFormat.upVoteButton.pushDataModel);
  let pushDataPrimaryKey = Object.keys(pushDataModel)[0];
  let oldPushData = JSON.parse(pushDataModel[pushDataPrimaryKey]);

  let newPushData = oldPushData;
  newPushData.value.blockHeight = cardData.blockHeight;

  let finalPushData = { index: {} };
  finalPushData.index[pushDataPrimaryKey] = JSON.stringify(
    newPushData,
    undefined,
    0
  );

  return finalPushData;
}

function getCommitCommentData() {
  let pushDataModel = JSON.parse(footerFormat.upVoteButton.pushDataModel);
  let pushDataPrimaryKey = Object.keys(pushDataModel)[0];
  let oldPushData = JSON.parse(pushDataModel[pushDataPrimaryKey]);

  let newPushData = oldPushData;
  newPushData.value.commentAnswer = state.answer ?? "caca";
  newPushData.value.blockHeight = cardData.blockHeight;

  let finalPushData = { index: {} };
  finalPushData.index[pushDataPrimaryKey] = JSON.stringify(
    newPushData,
    undefined,
    0
  );
  console.log(finalPushData);

  return finalPushData;
}

//---------------------------------------End functions------------------------------------------------------------------

//--------------------------------------Start components-----------------------------------------------------------------
const RenderCommentInput = (blockHeight) => {
  return state.displayCommentBox ? (
    <div
      style={{
        margin: "10px 0px",
      }}
      className="w-100 d-flex align-items-end flex-column"
    >
      <textarea
        style={textAreaStyle}
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
            : standardButtonSyles
        }
        data={getCommitCommentData()}
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
//---------------------------------------End components------------------------------------------------------------------

return (
  <>
    <div className="w-100 d-flex align-items-center justify-content-between">
      {footerFormat.comment.status && (
        <Widget
          src="mob.near/widget/CommentButton"
          props={{
            onClick: startCommentTo,
          }}
        />
      )}

      {footerFormat.repost.status && (
        <CommitButton
          style={
            state.hoveringElement == "repostButton"
              ? repostButtonHovering
              : repostButton
          }
          title="Repost"
          className="btn me-1"
          onMouseEnter={() => {
            State.update({ hoveringElement: "repostButton" });
          }}
          onMouseLeave={() => {
            State.update({ hoveringElement: "" });
          }}
          data={{
            index: {
              repost: JSON.stringify(getRepostCommentCallData(), undefined, 0),
            },
          }}
        >
          <span
            style={
              hasRepost
                ? {
                    color: "rgb(0, 184, 124)",
                  }
                : {}
            }
          >
            {repostSvg}
          </span>
        </CommitButton>
      )}
      {footerFormat.upVoteButton.status && (
        <div className="d-flex align-items-center justify-content-center">
          <CommitButton
            style={
              state.hoveringElement == "upVoteButton"
                ? hoveringButtonStylesWithoutMargin
                : standardButtonStylesWithoutMargin
            }
            onMouseEnter={() => {
              State.update({ hoveringElement: "upVoteButton" });
            }}
            onMouseLeave={() => {
              State.update({ hoveringElement: "" });
            }}
            data={getVoteUpButtonCommentCallData()}
          >
            Upvote
          </CommitButton>
          <span
            style={{
              margin: "0",
            }}
          >
            {cardData.value.upvotes ?? 0}{" "}
            {cardData.value.upvotes == 1 ? "upvote" : "upvotes"}
          </span>
        </div>
      )}
      {footerFormat.shareWidget.status && (
        <div style={{ margin: "0 0.5rem" }}>
          <Widget
            src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/shareWidget"
            props={{
              popUpDescription: footerFormat.shareWidget.popUpDescription,
              shareingWidget: footerFormat.shareWidget.shareingWidget,
              propName: footerFormat.shareWidget.propName,
              blockHeight: cardData.blockHeight,
              widgetOwner,
            }}
          />
        </div>
      )}
    </div>
    {RenderCommentInput(Number(cardData.blockHeight))}
  </>
);
