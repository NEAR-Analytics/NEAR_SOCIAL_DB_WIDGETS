const accountId = props.accountId ?? context.accountId;
let blockHeight = props.blockHeight ? parseInt(props.blockHeight) : undefined;
const profile = Social.getr(`${accountId}/profile`);
const keyPath = `${accountId}/post/Events`;
const question = props.Events ?? Social.getr(keyPath, blockHeight);

if (!Event) {
  return "Loading";
}

const profileLink = (c) => (
  <a
    className="text-decoration-none link-dark"
    href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
  >
    {c}
  </a>
);

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
          <div>
            <small className="ps-1 text-nowrap text-muted ms-auto">
              <i className="bi bi-clock me-1"></i>
              <Widget
                src="mob.near/widget/TimeAgo"
                props={{ now: !!props.Event, keyPath, blockHeight }}
              />
            </small>
          </div>
        </div>
        <div>
          {Event.title && <b>{Event.title}</b>}
          {Event.description && <p>{Event.description}</p>}
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
