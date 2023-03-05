const { accountId, value } = props;

return (
  <Widget
    src="mob.near/widget/Notification.Item.LR"
    props={{
      L: (
        <>
          liked your
          {value.item.path === `${context.accountId}/post/main` ? (
            <a
              className="fw-bold text-muted"
              href={`#/mob.near/widget/MainPage.Post.Page?accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
            >
              post
            </a>
          ) : value.item.path === `${context.accountId}/post/comment` ? (
            <a
              className="fw-bold text-muted"
              href={`#/mob.near/widget/MainPage.Comment.Page?accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
            >
              comment
            </a>
          ) : value.item.path === `${context.accountId}/post/insta` ? (
            <a
              className="fw-bold text-muted"
              href={`#/mob.near/widget/Insta.Post.Page?accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
            >
              insta
            </a>
          ) : (
            "item???"
          )}
        </>
      ),
      R:
        value.item.path === `${context.accountId}/post/main` ? (
          <a
            className="btn btn-outline-dark"
            href={`#/mob.near/widget/MainPage.Post.Page?accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
          >
            View post
          </a>
        ) : value.item.path === `${context.accountId}/post/comment` ? (
          <a
            className="btn btn-outline-dark"
            href={`#/mob.near/widget/MainPage.Comment.Page?accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
          >
            View comment
          </a>
        ) : value.item.path === `${context.accountId}/post/insta` ? (
          <a
            className="btn btn-outline-dark"
            href={`#/mob.near/widget/Insta.Post.Page?accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
          >
            View insta
          </a>
        ) : (
          ""
        ),
      ...props,
    }}
  />
);
