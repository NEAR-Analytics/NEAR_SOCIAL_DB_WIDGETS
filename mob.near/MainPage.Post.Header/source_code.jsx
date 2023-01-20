const accountId = props.accountId;
const blockHeight = props.blockHeight;
const postType = props.postType ?? "post";
const link = props.link;

return (
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
          <a className="text-muted" href={link}>
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
                text: `https://near.social/${link}`,
                className: "btn btn-outline-dark dropdown-item",
                label: "Copy link to post",
              }}
            />
          </li>
        </ul>
      </span>
    </span>
  </div>
);
