/**
 * MainPage.ContentPlus
 * Source: mob.near/widget/MainPage.Content
 */

//get blocked list
const userProfile = Social.getr(`${context.accountId}/profile`);
console.log("Profile User ", userProfile);
const blockedListArr = userProfile?.cdcBlockList
  ? userProfile?.cdcBlockList.split(",")
  : [];
blockedListArr = blockedListArr.map((e) => e.trim());

//init State
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
    console.log("Following Accounts: ", accounts, "Socials: ", Social);
    accounts.push(context.accountId);
  } else {
    accounts = [];
  }
}

/**
 * WidgetCommentFeed
 * Source: mob.near/widget/MainPage.Comment.Feed
 */

let WidgetCommentFeed = (props) => {
  console.log("blockedListArr", blockedListArr);

  console.log("props ", props);
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

  //TODO: hide comment here
  const renderItem = (a) =>
    a.value.type === "md" &&
    blockedListArr.length > 0 &&
    blockedListArr.indexOf(a.accountId) < 0 && (
      <div key={JSON.stringify(a)}>
        <Widget
          src="mob.near/widget/MainPage.Comment"
          props={{
            accountId: a.accountId,
            blockHeight: a.blockHeight,
            highlight:
              a.accountId === props.highlightComment?.accountId &&
              a.blockHeight === props.highlightComment?.blockHeight,
            raw,
          }}
        />
      </div>
    );

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
  console.log("Following accounts: ", props.accounts);

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
    a.value.type === "md" &&
    blockedListArr.length > 0 &&
    blockedListArr.indexOf(a.accountId) < 0 && (
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
    {WidgetFeed({ accounts })}
  </>
);
