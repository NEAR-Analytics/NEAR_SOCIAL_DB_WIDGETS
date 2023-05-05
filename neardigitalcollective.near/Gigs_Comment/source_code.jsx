const addressForArticles = "ndcGigArticle";
const addressForComments = "gig-comments";
const authorForWidget = "neardigitalcollective.near";
State.init({ showReply: false });
const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(
    Social.get(
      `${accountId}/${addressForArticles}/${addressForComments}`,
      blockHeight
    ) ?? "null"
  );
const parentItem = content.item;
const highlight = !!props.highlight;
const raw = !!props.raw;

//TODO - adress should be changed
const link = `#/mob.near/widget/MainPage.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

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
          {parentItem && (
            <Widget
              src="mob.near/widget/CommentButton"
              props={{
                onClick: () => State.update({ showReply: !state.showReply }),
              }}
            />
          )}
        </div>
      )}
    </div>
    {state.showReply && (
      <div className="mb-2" key="reply">
        <Widget
          src={`${authorForWidget}/widget/Gigs_Comment.Compose`}
          props={{
            initialText: `${accountId}, `,
            // notifyAccountId: extractNotifyAccountId(parentItem),
            item: parentItem,
            onComment: () => State.update({ showReply: false }),
          }}
        />
      </div>
    )}
  </>
);
