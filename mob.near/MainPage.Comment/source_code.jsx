const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/comment`, blockHeight) ?? "null");
const parentItem = content.item;

const link = `#/mob.near/widget/MainPage.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

return (
  <div className={"pt-3 border-top pb-2"}>
    <Widget
      src="mob.near/widget/MainPage.Post.Header"
      props={{ accountId, blockHeight, link, postType: "comment" }}
    />
    <div className="mt-2 text-break">
      <Widget src="mob.near/widget/MainPage.Post.Content" props={{ content }} />
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
    {state.showReply && (
      <div className="mb-2" key="reply">
        <Widget
          src="mob.near/widget/MainPage.Comment.Compose"
          props={{
            notifyAccountId,
            initialText: `@${accountId}, `,
            item: parentItem,
            onComment: () => State.update({ showReply: false }),
          }}
        />
      </div>
    )}
  </div>
);
