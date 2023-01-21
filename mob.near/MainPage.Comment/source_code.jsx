const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/comment`, blockHeight) ?? "null");

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
      <div className="mt-1">
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
      </div>
    )}
  </div>
);
