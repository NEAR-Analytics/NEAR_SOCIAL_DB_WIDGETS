const accountId = props.accountId ?? context.accountId;
let blockHeight = props.blockHeight ? parseInt(props.blockHeight) : undefined;
const profile = Social.getr(`${accountId}/profile`);
const entry =
  props.entry ?? Social.getr(`${accountId}/post/entry`, blockHeight);
const shorten = props.shorten ?? false;

if (!entry) {
  return "Loading";
}

if (!props.entry && !blockHeight) {
  blockHeight = Social.keys(`${accountId}/post/entry`, undefined, {
    return_type: "BlockHeight",
  })[accountId].post.entry;
  if (!blockHeight) {
    return "Loading";
  }
}

const profileLink = (c) => (
  <a
    className="text-decoration-none"
    href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
  >
    {c}
  </a>
);

const contentStyle = shorten ? { overflow: "hidden", height: "100px" } : {};

return (
  <div style={{ maxWidth: "40em" }}>
    <div
      className="d-flex align-items-start"
      style={{
        padding: "1.5rem 0",
        borderBottom: "1px solid #e9e9e9",
      }}
    >
      <div>
        {profileLink(
          <Widget src="mob.near/widget/ProfileImage" props={{ accountId }} />
        )}
      </div>
      <div className="ms-2 flex-grow-1" style={{ minWidth: 0 }}>
        <div className="d-flex justify-content-start">
          <div className="flex-grow-1 me-1 text-truncate">
            {profileLink(
              <>
                <span className="fw-bold">{profile.name}</span>
                <span className="text-secondary">@{accountId}</span>
              </>
            )}
          </div>
        </div>
        <div style={contentStyle}>
          {entry.title && <b>{entry.title}</b>}
          {entry.content && <Markdown text={entry.content} />}
        </div>
        <p className="small text-muted mt-2 mb-0">
          <span>
            <i className="bi bi-star me-1"></i>4
          </span>
          <span className="ms-2">
            <i className="bi bi-chat-square-fill me-1"></i>20
          </span>
          <span className="ms-2">
            <i className="bi bi-reply"></i>
          </span>
        </p>
      </div>
    </div>
  </div>
);
