const { accountId, value } = props;

return (
  <Widget
    src="mob.near/widget/Notification.Item.LR"
    props={{
      L: (
        <>
          reposted your
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
      R:
        value.item.path === `${context.accountId}/post/main` ? (
          <a
            className="btn btn-outline-dark"
            href={`#/mob.near/widget/MainPage.Post.Page?accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
          >
            View post
          </a>
        ) : (
          ""
        ),
      ...props,
    }}
  />
);
