const accountId = props.accountId;
const blockHeight = props.blockHeight;
const postType = props.postType ?? "post";
const link = props.link;
const externalLink = `https://social.near.page/${
  postType === "post" ? "p" : "c"
}/${accountId}/${blockHeight}`;

const clickbaitPrompt =
  props.clickbaitPrompt ??
  `Check out this ${postType} on @NearSocial_\n#NearSocial #NEAR #BOS\n${externalLink}`;

const twitterUrl = new URL("https://twitter.com/intent/tweet");
twitterUrl.searchParams.set("text", clickbaitPrompt);

const mailtoUrl = new URL("mailto:");
mailtoUrl.searchParams.set(
  "subject",
  `Check out this ${postType} on Near Social`
);
mailtoUrl.searchParams.set(
  "body",
  `Take a look this ${postType}.
${externalLink}
`
);

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
            <li>
              <Widget
                src="mob.near/widget/CopyButton"
                props={{
                  text: externalLink,
                  className: "btn btn-outline-dark dropdown-item",
                  label: `Copy link to ${postType}`,
                }}
              />
            </li>
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
                    item: props.flagItem,
                    label: `Flag ${postType} for moderation`,
                  }}
                />
              </li>
            )}
            <li className="dropdown-item">
              <a
                className="link-dark text-decoration-none"
                href={mailtoUrl.toString()}
                target="_blank"
              >
                <i className="bi bi-envelope-at" /> Share by email
              </a>
            </li>
            <li className="dropdown-item">
              <a
                className="link-dark text-decoration-none"
                href={twitterUrl.toString()}
                target="_blank"
              >
                <i className="bi bi-twitter" />
                Share on Twitter
              </a>
            </li>
          </ul>
        </span>
      )}
    </span>
  </div>
);
