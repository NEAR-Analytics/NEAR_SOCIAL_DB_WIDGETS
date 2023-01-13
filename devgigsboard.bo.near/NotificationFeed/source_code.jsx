const accountId = context.accountId;

if (context.loading) {
  return "Loading";
}

if (!accountId) {
  return "Sign in with NEAR Wallet";
}

const notifications = Social.index("notify", accountId, {
  order: "desc",
  limit: 100,
  subscribe: true,
});

if (notifications === null) {
  return "Loading";
}

if (notifications.length === 0) {
  return "No notifications";
}

Storage.set("lastBlockHeight", notifications[0].blockHeight);

return (
  <>
    {notifications.map(({ accountId, blockHeight, value }, i) => (
      <div key={i} className="d-flex justify-content-between mb-3">
        <div className="me-2 text-truncate">
          <div className="text-truncate">
            <Widget src="mob.near/widget/ProfileLine" props={{ accountId }} />
          </div>
          <div
            className="text-truncate text-muted"
            style={{ paddingLeft: "1.8em" }}
          >
            {value.type === "follow" ? (
              "followed you"
            ) : value.type === "unfollow" ? (
              "unfollowed you"
            ) : value.type === "poke" ? (
              "poked you"
            ) : value.type === "like" ? (
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
                ) : (
                  "item???"
                )}
              </>
            ) : value.type === "comment" ? (
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
            ) : value.type === "devgovgigs/like" ? (
              <>
                liked your
                <a
                  className="fw-bold text-muted"
                  href={`#/devgigsboard.bo.near/widget/Ideas?postId=${value.post}`}
                >
                  Developer Gigs Post
                </a>
              </>
            ) : value.type === "devgovgigs/reply" ? (
              <>
                replied your
                <a
                  className="fw-bold text-muted"
                  href={`#/devgigsboard.bo.near/widget/Ideas?postId=${value.post}`}
                >
                  Developer Gigs Post
                </a>
              </>
            ) : value.type === "devgovgigs/edit" ? (
              <>
                edited your
                <a
                  className="fw-bold text-muted"
                  href={`#/devgigsboard.bo.near/widget/Ideas?postId=${value.post}`}
                >
                  Developer Gigs Post
                </a>
              </>
            ) : (
              "???"
            )}
            <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
          </div>
        </div>
        <div className="text-nowrap">
          {value.type === "follow" || value.type === "unfollow" ? (
            <Widget src="mob.near/widget/FollowButton" props={{ accountId }} />
          ) : value.type === "poke" ? (
            <Widget
              src="mob.near/widget/PokeButton"
              props={{ accountId, back: true }}
            />
          ) : value.type === "like" ? (
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
            ) : (
              ""
            )
          ) : value.type === "comment" ? (
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
          ) : value.type === "devgovgigs/like" ||
            value.type === "devgovgigs/reply" ||
            value.type === "devgovgigs/edit" ? (
            <>
              <a
                className="btn btn-outline-dark"
                href={`#/devgigsboard.bo.near/widget/Ideas?postId=${value.post}`}
              >
                View Developer Gigs Post
              </a>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    ))}
  </>
);
