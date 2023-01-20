const accountId = props.accountId;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const content =
  props.content ??
  JSON.parse(Social.get(`${accountId}/post/main`, blockHeight) ?? "null");

const notifyAccountId = accountId;
const item = {
  type: "social",
  path: `${accountId}/post/main`,
  blockHeight,
};

return (
  <div className="border rounded-4 p-3 pb-1">
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
      <span className="text-nowrap text-muted">
        <small>
          {blockHeight === "now" ? (
            "now"
          ) : (
            <a
              className="text-muted"
              href={`#/mob.near/widget/MainPage.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`}
            >
              <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
            </a>
          )}
        </small>
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
            <li>
              <Widget
                src="mob.near/widget/CopyButton"
                props={{
                  text: `#/mob.near/widget/MainPage.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`,
                  className: "btn btn-outline-dark dropdown-item",
                  label: "Copy link to post",
                }}
              />
            </li>
          </ul>
        </span>
      </span>
    </div>
    <div className="mt-3 text-break">
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
      <Widget
        src="mob.near/widget/MainPage.Comment.Feed"
        props={{
          item,
        }}
      />
    </div>
  </div>
);
