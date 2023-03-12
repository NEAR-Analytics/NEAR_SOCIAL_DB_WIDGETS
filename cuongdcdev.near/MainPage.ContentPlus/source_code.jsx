/**
 * MainPage.ContentPlus
 * Source: mob.near/widget/MainPage.Content
 */
const hashtag = props.hashtag;

//get blocked list
const userProfile = Social.getr(`${context.accountId}/profile`);
let blockedListArr = [];

if (context.accountId && userProfile.cdcBlockList) {
  blockedListArr = userProfile.cdcBlockList.split(",");
  blockedListArr = blockedListArr.map((e) => e.trim());
}

let isInBlockedList = (walletId) => {
  if (!context.accountId) return false;
  if (blockedListArr.length > 0 && blockedListArr.indexOf(walletId) >= 0) {
    return true;
  }
  return false;
};

if (!state || state.hashtag !== hashtag) {
  State.update({
    feedIndex: hashtag ? 2 : context.accountId ? 0 : 1,
    hashtag,
  });
}

const options = [
  {
    title: "My Feed",
    disabled: !context.accountId,
  },
  {
    title: "All Posts",
  },
];

if (hashtag) {
  options.push({
    title: `#${hashtag}`,
  });
}

let accounts = undefined;

if (state.feedIndex === 0) {
  const graph = Social.keys(`${context.accountId}/graph/follow/*`, "final");
  if (graph !== null) {
    accounts = Object.keys(graph[context.accountId].graph.follow || {});
    // console.log("Following Accounts: ", accounts, "Socials: ", Social);
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
  let index = {
    action: "comment",
    key: props.item,
    options: {
      limit: props.limit ?? 3,
      order: "desc",
      accountId: props.accounts,
      subscribe: props.subscribe,
    },
  };

  let raw = !!props.raw;

  //TODO: hide comment here
  let renderItem = (a) =>
    a.value.type === "md" &&
    !isInBlockedList(a.accountId) && (
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
 * Widget Feed
 * Source: mob.near/widget/Mainpage.Feed
 * */
let WidgetFeed = (props) => {
  //console.log("Following accounts: ", props.accounts);
  let index = {
    action: "post",
    key: "main",
    options: {
      limit: 10,
      order: "desc",
      accountId: props.accounts,
    },
  };
  //TODO: hide post from blocked list here
  let renderItem = (a) => {
    if (isInBlockedList(a.accountId)) {
      console.log(a.accountId + " is BLOCKED");
      return;
    }

    return (
      a.value.type === "md" && (
        <div key={JSON.stringify(a)} className="mb-3">
          <Widget
            src="cuongdcdev.near/widget/MainPage.PostPlus"
            props={{
              accountId: a.accountId,
              isPostBlocked: isInBlockedList(a.accountId),
              blockHeight: a.blockHeight,
              blockedListArr: blockedListArr,
            }}
          />
        </div>
      )
    );
  };

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
    {state.feedIndex === 2 ? (
      <Widget src="mob.near/widget/Hashtag.Feed" props={{ hashtag }} />
    ) : (
      WidgetFeed({ accounts })
    )}
  </>
);
