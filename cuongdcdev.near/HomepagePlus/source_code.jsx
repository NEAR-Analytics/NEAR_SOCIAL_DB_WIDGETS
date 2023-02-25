State.init({
  feedIndex: context.accountId ? 0 : 1,
});

const options = [
  {
    title: "My Feed",
    disabled: !context.accountId,
  },
  {
    title: "All Posts",
  },
];

let accounts = undefined;

if (state.feedIndex === 0) {
  const graph = Social.keys(`${context.accountId}/graph/follow/*`, "final");
  if (graph !== null) {
    accounts = Object.keys(graph[context.accountId].graph.follow || {});
    // console.log("Accounts: ", accounts, "Socials: ", Social);
    accounts.push(context.accountId);
  } else {
    accounts = [];
  }
}

/**
 * WidgetCommentPost
 * Source: mob.near/widget/MainPage.Comment
 */

let WidgetCommentPost = (props) => {
  const accountId = props.accountId;
  console.log("widgetCommentPost AccountId (commenter): ", accountId);

  const blockHeight =
    props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
  const content =
    props.content ??
    JSON.parse(Social.get(`${accountId}/post/comment`, blockHeight) ?? "null");
  const parentItem = content.item;
  const highlight = !!props.highlight;
  const raw = !!props.raw;

  const extractNotifyAccountId = (item) => {
    if (!item || item.type !== "social" || !item.path) {
      return undefined;
    }
    const accountId = item.path.split("/")[0];
    return `${accountId}/post/main` === item.path ? accountId : undefined;
  };

  const link = `#/mob.near/widget/MainPage.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

  if (1 == 2 && accountId && accountId.indexOf("hypefairy.near") !== -1) {
    console.log("detected: ", accountId);
    return (
      <>
        {state.showReply && (
          <div className="mb-2" key="reply">
            <Widget
              src="mob.near/widget/MainPage.Comment.Compose"
              props={{
                initialText: `@${accountId}, `,
                notifyAccountId: extractNotifyAccountId(parentItem),
                item: parentItem,
                onComment: () => State.update({ showReply: false }),
              }}
            />
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div
        className={`pt-3 border-top pb-2 ${
          highlight ? "bg-warning bg-opacity-10" : ""
        }`}
      >
        <Widget
          src="mob.near/widget/MainPage.Post.Header"
          props={{ accountId, blockHeight, link, postType: "comment" }}
        />
        <div className="mt-2 text-break">
          <Widget
            src="mob.near/widget/MainPage.Post.Content"
            props={{ content, raw }}
          />
        </div>
        {blockHeight !== "now" && (
          <div className="mt-1 d-flex justify-content-between">
            <Widget
              src="mob.near/widget/LikeButton"
              props={{
                notifyAccountId: accountId,
                item: {
                  type: "social",
                  path: `${accountId}/post/comment`,
                  blockHeight,
                },
              }}
            />
            {parentItem && (
              <Widget
                src="mob.near/widget/CommentButton"
                props={{
                  onClick: () =>
                    !state.showReply && State.update({ showReply: true }),
                }}
              />
            )}
          </div>
        )}
      </div>
      {state.showReply && (
        <div className="mb-2" key="reply">
          <Widget
            src="mob.near/widget/MainPage.Comment.Compose"
            props={{
              initialText: `@${accountId}, `,
              notifyAccountId: extractNotifyAccountId(parentItem),
              item: parentItem,
              onComment: () => State.update({ showReply: false }),
            }}
          />
        </div>
      )}
    </>
  );
};
//end WidgetCommentPost

/**
 * WidgetCommentFeed
 * Source: mob.near/widget/MainPage.Comment.Feed
 */

let WidgetCommentFeed = (props) => {
  const index = {
    action: "comment",
    key: props.item,
    options: {
      limit: props.limit ?? 3,
      order: "desc",
      accountId: props.accounts,
      subscribe: props.subscribe,
    },
  };

  const raw = !!props.raw;
  console.log("index ", index);
  console.log("raw", raw);
  //TODO: da tim thay user comment can loai bo
  const renderItem = (a) => {
    console.log("AccountId: ", a.accountId);

    a.value.type === "md" && (
      <div key={JSON.stringify(a)}>
        {WidgetCommentPost({
          accountId: a.accountId,
          blockHeight: a.blockHeight,
          highlight:
            a.accountId === props.highlightComment?.accountId &&
            a.blockHeight === props.highlightComment?.blockHeight,
          raw,
        })}
      </div>
    );
  };
  return (
    <div>
      <Widget
        src="mob.near/widget/ManualIndexFeed"
        props={{
          index,
          reverse: true,
          renderItem,
          nextLimit: 10,
          loadMoreText: "Show earlier comments...",
        }}
      />
    </div>
  );
};
//end WidgetCommentFeed

/**
 * WidgetPost
 * Source: mob.near/widget/MainPage.Post
 * */
let WidgetPost = (props) => {
  const accountId = props.accountId;
  const blockHeight =
    props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
  const content =
    props.content ??
    JSON.parse(Social.get(`${accountId}/post/main`, blockHeight) ?? "null");
  const subscribe = !!props.subscribe;
  const raw = !!props.raw;

  const notifyAccountId = accountId;
  const item = {
    type: "social",
    path: `${accountId}/post/main`,
    blockHeight,
  };

  const link = `#/mob.near/widget/MainPage.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

  return (
    <div className="border rounded-4 p-3 pb-1">
      <Widget
        src="mob.near/widget/MainPage.Post.Header"
        props={{ accountId, blockHeight, link, postType: "post" }}
      />
      <div className="mt-3 text-break">
        <Widget
          src="mob.near/widget/MainPage.Post.Content"
          props={{ content, raw }}
        />
      </div>
      {blockHeight !== "now" && (
        <div className="mt-1 d-flex justify-content-between">
          <Widget
            src="mob.near/widget/LikeButton"
            props={{
              notifyAccountId,
              item,
            }}
          />
          <Widget
            src="mob.near/widget/CommentButton"
            props={{
              onClick: () =>
                !state.showReply && State.update({ showReply: true }),
            }}
          />
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
        {WidgetCommentFeed({
          item,
          highlightComment: props.highlightComment,
          limit: props.commentsLimit,
          subscribe,
          raw,
        })}
      </div>
    </div>
  );
};
/**
 *
 */

/**
 * Widget Feed
 * Source: mob.near/widget/Mainpage.Feed
 * */
let WidgetFeed = (props) => {
  const index = {
    action: "post",
    key: "main",
    options: {
      limit: 10,
      order: "desc",
      accountId: props.accounts,
    },
  };

  const renderItem = (a) =>
    a.value.type === "md" && (
      <div key={JSON.stringify(a)} className="mb-3">
        {WidgetPost({ accountId: a.accountId, blockHeight: a.blockHeight })}
      </div>
    );

  return (
    <div>
      <Widget src="mob.near/widget/IndexFeed" props={{ index, renderItem }} />
    </div>
  );
};
//End widget feed

return (
  <>
    {context.accountId && (
      <div className="mb-3">
        <Widget src="mob.near/widget/MainPage.Compose" props={{}} />
      </div>
    )}
    <ul className="nav nav-pills mb-3">
      {options.map((option, i) => (
        <li className="nav-item" key={i}>
          <button
            className={`nav-link ${state.feedIndex === i ? "active" : ""} ${
              option.disabled ? "disabled" : ""
            }`}
            aria-disabled={!!option.disabled}
            onClick={() => !option.disabled && State.update({ feedIndex: i })}
          >
            {option.title}
          </button>
        </li>
      ))}
    </ul>
    {WidgetFeed(props)}
  </>
);
