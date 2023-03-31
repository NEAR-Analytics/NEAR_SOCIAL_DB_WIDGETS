const accountId = props.accountId;
if (props.isPostBlocked) return <></>;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/main`, blockHeight) ?? "null");
const subscribe = !!props.subscribe;
const raw = !!props.raw;
const blockedListArr = props.blockedListArr ? props.blockedListArr : [];
let isInBlockedList = (walletId) => {
  if (!context.accountId) return false;
  if (blockedListArr.length > 0 && blockedListArr.indexOf(walletId) >= 0) {
    return true;
  }
  return false;
};
const notifyAccountId = accountId;
const item = {
  type: "social",
  path: `${accountId}/post/main`,
  blockHeight,
};

const link = `#/cuongdcdev.near/widget/MainPage.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

let tipNEAR = (accId) => {
  let amount = "500000000000000000000000"; //0.5N
  Near.call(
    "passthrough.near",
    "transfer",
    { receiver_id: accId },
    gas,
    amount
  );
};
/**
 * WidgetCommentFeed
 * Source: mob.near/widget/MainPage.Comment.Feed
 */

let WidgetCommentFeed = (props) => {
  // console.log("props ", props);
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

        <div>
          <Widget
            src="mob.near/widget/RepostButton"
            props={{
              notifyAccountId,
              item,
            }}
          />
        </div>

        <div
          class="d-inline-flex align-items-center"
          onClick={() => tipNEAR(notifyAccountId)}
        >
          <button class="btn btn-active me-1" title="Tip 1 NEAR">
            <i class="bi bi-send fs-4"></i>
          </button>
        </div>

        <div>
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
