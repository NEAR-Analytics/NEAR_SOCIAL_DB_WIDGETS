const { accountId, blockHeight, value } = props;

return (
  <Widget
    src="mob.near/widget/Notification.Item.LR"
    props={{
      L: (
        <>
          <a
            className="fw-bold text-muted"
            href={`#/mob.near/widget/MainPage.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`}
          >
            replied
          </a>{" "}
          to your
          {value.item.path === `${context.accountId}/post/main` ? (
            <a
              className="fw-bold text-muted"
              href={`#/mob.near/widget/MainPage.Post.Page?accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
            >
              post
            </a>
          ) : (
            "item???"
          )}
        </>
      ),
      R: (
        <>
          <a
            className="btn btn-outline-dark"
            href={`#/mob.near/widget/MainPage.Comment.Page?accountId=${accountId}&blockHeight=${blockHeight}`}
          >
            View comment
          </a>
          {value.item.path === `${context.accountId}/post/main` && (
            <a
              className="btn btn-outline-dark d-none d-md-inline-block"
              href={`#/mob.near/widget/MainPage.Post.Page?accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
            >
              View post
            </a>
          )}
        </>
      ),
      ...props,
    }}
  />
);
