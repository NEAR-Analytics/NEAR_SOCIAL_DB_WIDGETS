const accountId = props.accountId;
const blockHeight = props.blockHeight;
const postType = props.postType ?? "post";
const link = props.link;
const externalLink = `https://near.social/${link}`;

const clickbaitPrompt =
  props.clickbaitPrompt ??
  `Are you tired of social media algorithms limiting your reach?\nSay goodbye to restrictions and hello to true social freedom with @NearSocial_\n#NearSocial #NEAR #BOS\n${externalLink}`;

const twitterUrl = new URL("https://twitter.com/intent/tweet");
twitterUrl.searchParams.set("text", clickbaitPrompt);

const mailtoUrl = new URL("mailto:");
mailtoUrl.searchParams.set(
  "subject",
  "Discover True Social Freedom with Near Social"
);
mailtoUrl.searchParams.set(
  "body",
  `Fellow human,

Are you tired of feeling restricted by social media algorithms? Do you miss the days when you could connect with like-minded individuals without worrying about censorship or limitations?

At Near.social, we believe in true social freedom. Our platform is designed to give you the power to connect, engage, and share your ideas with the world on your terms. With Near.social, you can:

Be the #BOS!

Join a community of like-minded individuals who share your interests and values
Connect with people all over the world without worrying about language barriers
Share your thoughts, ideas, and experiences without censorship or algorithm limitations
If you're ready to experience true social freedom, we invite you to join Near.social today. Our platform is easy to use, secure, and designed with your needs in mind. Plus, our community is filled with passionate and creative individuals who are ready to welcome you with open arms.

Don't wait any longer to discover the power of Near.social. Sign up today and experience a new way to connect with the world.

${externalLink}

Best regards,
ChatGPT.
`
);

return (
  <div className="d-flex flex-row align-items-center vh-100">
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
                  text: `https://near.social/${link}`,
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
