const tabs = {
  ALL_kUDOS: {
    id: 0,
    text: "All Kudos",
  },
  KUDO: {
    id: 1,
    text: "Kudo",
  },
};

const blockHeight = props.blockHeight ?? undefined;

const updateGeneralState = props.updateGeneralState;

const thisWidgetInlineStyles = props.allWidgetsInlineStyles.kudos;
const thisWidgetClassNames = props.allWidgetsClassNames.kudos;

const widgetOwner = props.widgetOwner;

const widgetName = "Kudos";
const widgetPath = `webuidl.near/widget/${widgetName}`;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);

const urlPrefix = "https://";
const accountId = props.accountId ?? "*";

const data = Social.index("kudos", "answer");
if (!data) {
  return "Loading answers";
}
const upvotes = Social.index("kudos", "upvote");
if (!upvotes) {
  return "Loading upvotes";
}

const commentAnswers = Social.index("kudos", "commentAnswers");
if (!commentAnswers) {
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
  sortedData[i].value.upvotes = 0;
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

upvotes.forEach((upvote) => {
  const dataIndex = sortedData.findIndex(
    (d) => d.blockHeight == upvote.value.blockHeight
  );
  if (dataIndex === -1) return;
  sortedData[dataIndex].value.upvotes += 1;
});

const finalData = sortedData;

const kudoBlockHeightFiltered = finalData.filter(
  (d) => d.blockHeight == blockHeight
);

const openKudo = kudoBlockHeightFiltered[0] ?? {};

State.init({
  hoveringElement: "",
  input: "",
  url: "",
  onChange: ({ content }) => {
    State.update({ content });
  },
  display: blockHeight ? tabs.KUDO.id : tabs.ALL_kUDOS.id,
  kudo: openKudo,
});

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

/* END CommentButton  */

const RenderKudoBox = (d, index) => {
  return (
    <Widget
      src={`${widgetOwner}/widget/kudoBox`}
      props={{
        tabs,
        oppenedTab: state.display,
        widgetOwner,
        d,
        index,
        upvotes,
        updateGeneralState,
        allWidgetsInlineStyles: props.allWidgetsInlineStyles,
        allWidgetsClassNames: props.allWidgetsClassNames,
      }}
    />
  );
};

return (
  <div
    style={thisWidgetInlineStyles.generalContainer}
    className={thisWidgetClassNames.generalContainer}
  >
    <div className={thisWidgetClassNames.selectedTabContainer}>
      <h2 style={thisWidgetInlineStyles.selectedTab}>
        {state.display == tabs.ALL_kUDOS.id
          ? tabs.ALL_kUDOS.text
          : `${tabs.KUDO.text}`}
      </h2>
      {state.display == tabs.KUDO.id && (
        <i
          className="bi bi-x-lg"
          style={thisWidgetInlineStyles.closeKudoButton}
          onClick={() => {
            State.update({ display: tabs.ALL_kUDOS.id, kudo: {} });
          }}
        ></i>
      )}
    </div>

    {state.display == tabs.ALL_kUDOS.id && (
      <>
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

        <div className={thisWidgetClassNames.urlTextareaContainer}>
          <p>Url:</p>
          <textarea
            style={thisWidgetInlineStyles.urlTextarea}
            rows="1"
            value={state.url}
            onChange={(e) => {
              State.update({ url: e.target.value });
            }}
          />
        </div>
        <CommitButton
          style={
            state.hoveringElement == "commitButton"
              ? props.allWidgetsInlineStyles.hoveringButtonStyles
              : props.allWidgetsInlineStyles.standardButtonStyles
          }
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
          onMouseEnter={() => {
            State.update({ hoveringElement: "commitButton" });
          }}
          onMouseLeave={() => {
            State.update({ hoveringElement: "" });
          }}
          onCommit={() => {
            State.update({
              reloadData: true,
            });
          }}
        >
          Kudos!
        </CommitButton>
      </>
    )}

    {state.display == tabs.ALL_kUDOS.id && (
      <div className={thisWidgetClassNames.allCardsContainer}>
        {sortedData
          ? sortedData.map((d, index) => {
              return RenderKudoBox(d, index);
            })
          : "Loading..."}
      </div>
    )}
    {state.display == tabs.KUDO.id && RenderKudoBox(state.kudo, 0)}
  </div>
);
