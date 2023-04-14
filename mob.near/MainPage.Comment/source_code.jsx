const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/comment`, blockHeight) ?? "null");

return (
  <div className={"pt-3 border-top pb-2"}>
    <div className="d-flex flex-row align-items-center">
      <div className="flex-grow-1 text-truncate">
        <a
          className="text-dark text-decoration-none text-truncate"
          href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
        >
          <Widget
            src="mob.near/widget/Profile.ShortInlineBlock"
            props={{ accountId }}
          />
        </a>
      </div>
      <small className="text-nowrap text-muted">
        {blockHeight === "now" ? (
          "now"
        ) : (
          <a
            className="text-muted"
            href={`#/mob.near/widget/MainPage.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`}
          >
            <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
          </a>
        )}
      </small>
    </div>
    <div className="mt-1">
      {content ? (
        <>
          {content.text && <Markdown text={content.text} />}
          {content.image && (
            <div className="w-100 rounded-3 text-center">
              <Widget
                src="mob.near/widget/Image"
                props={{
                  image: content.image,
                  className: "img-fluid rounded-3",
                  style: { maxHeight: "20em" },
                }}
              />
            </div>
          )}
        </>
      ) : (
        <span
          className="spinner-grow spinner-grow-sm me-1"
          role="status"
          aria-hidden="true"
        />
      )}
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
