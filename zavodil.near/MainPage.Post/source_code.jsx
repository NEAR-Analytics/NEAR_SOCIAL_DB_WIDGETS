const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);
const hideComments = props.hideComments ?? true;
const repostsNum = Number(props.repostsNum ?? 0);
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

const renderPostHeader = (
  accountId,
  blockHeight,
  link,
  postType,
  flagItem,
  repostsNum
) => {
  return (
    <div className="d-flex flex-row align-items-center">
      <div className="flex-grow-1 text-truncate">
        <a
          className="text-dark text-decoration-none text-truncate"
          href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
        >
          <Widget
            src="mob.near/widget/Profile.ShortInlineBlock"
            props={{ accountId, tooltip: true }}
          />
        </a>
      </div>
      {repostsNum > 0 && (
        <span className="text-nowrap pe-2">
          {`${repostsNum} repost${repostsNum == 1 ? "" : "s"}`}
        </span>
      )}
      <span className="text-nowrap text-muted">
        <small>
          {blockHeight === "now" ? (
            "now"
          ) : (
            <a className="text-muted" href={link}>
              <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
            </a>
          )}
        </small>
        {blockHeight !== "now" && (
          <span>
            <a
              href="javascript:void"
              className="link-secondary ms-2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fs-6 bi bi-three-dots" />
            </a>
            <ul className="dropdown-menu">
              <li className="dropdown-item">
                <a
                  className="link-dark text-decoration-none"
                  href={`${link}&raw=true`}
                >
                  <i className="bi bi-filetype-raw" /> View raw markdown source
                </a>
              </li>
              <li>
                <Widget
                  src="mob.near/widget/MainPage.Common.HideAccount"
                  props={{ accountId }}
                />
              </li>
              {props.flagItem && (
                <li>
                  <Widget
                    src="mob.near/widget/MainPage.Common.FlagContent"
                    props={{
                      item: flagItem,
                      label: `Flag ${postType} for moderation`,
                    }}
                  />
                </li>
              )}
            </ul>
          </span>
        )}
      </span>
    </div>
  );
};

return (
  <div className="border rounded-4 p-3 pb-1">
    {renderPostHeader(accountId, blockHeight, link, "post", item, repostsNum)}
    <div className="mt-3 text-break">
      <Widget
        src="mob.near/widget/MainPage.Post.Content"
        props={{ content, raw }}
      />
    </div>
    {blockHeight !== "now" && (
      <div className="mt-1 d-flex justify-content-between">
        <div className="me-4">
          <Widget
            src="mob.near/widget/CommentButton"
            props={{
              onClick: () =>
                !state.showReply && State.update({ showReply: true }),
            }}
          />
        </div>
        <div className="me-4">
          <Widget
            src="mob.near/widget/RepostButton"
            props={{
              notifyAccountId,
              item,
            }}
          />
        </div>
        <div className="me-4">
          <Widget
            src="mob.near/widget/LikeButton"
            props={{
              notifyAccountId,
              item,
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
      {!hideComments && (
        <Widget
          src="mob.near/widget/MainPage.Comment.Feed"
          props={{
            item,
            highlightComment: props.highlightComment,
            limit: props.commentsLimit,
            subscribe,
            raw,
          }}
        />
      )}
    </div>
  </div>
);
