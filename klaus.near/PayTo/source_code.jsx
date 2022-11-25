const accountId = props.accountId ?? context.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const showEditButton =
  !props.profile && accountId && accountId === context.accountId;

const name = profile.name;
const description = profile.description;
const image = profile.image;

const linktree = profile.linktree;

return (
  <div className="profile">
    <Widget
      src="mob.near/widget/ProfileImage"
      props={{
        profile,
        accountId,
        className: "float-start d-inline-block me-2",
      }}
    />
    <div className="profile-info d-inline-block" style={{ maxWidth: "16em" }}>
      <div className="profile-name text-truncate">
        {name || "No-name profile"}
      </div>
      <div className="profile-description">{description}</div>
      <div className="profile-links d-flex">
        <div className="d-inline-block profile-account text-secondary text-truncate">
          @{accountId}
        </div>
        {linktree.website && (
          <div className="ms-1 d-inline-block">
            <a href={`https://${linktree.website.replace("https://", "")}`}>
              <i className="bi bi-globe2 text-secondary"></i>
            </a>
          </div>
        )}
        {linktree.github && (
          <div className="ms-1 d-inline-block">
            <a
              href={`https://github.com/${linktree.github.replace(
                "https://github.com/",
                ""
              )}`}
            >
              <i className="bi bi-github text-secondary"></i>
            </a>
          </div>
        )}
        {linktree.twitter && (
          <div className="ms-1 d-inline-block">
            <a
              href={`https://twitter.com/${linktree.twitter.replace(
                "https://twitter.com/",
                ""
              )}`}
            >
              <i className="bi bi-twitter text-secondary"></i>
            </a>
          </div>
        )}
        {linktree.telegram && (
          <div className="ms-1 d-inline-block">
            <a
              href={`https://t.me/${linktree.telegram.replace(
                "https://t.me/",
                ""
              )}`}
            >
              <i className="bi bi-telegram text-secondary"></i>
            </a>
          </div>
        )}
      </div>
    </div>
    {showEditButton && (
      <a
        href="#/mob.near/widget/ProfileEditor"
        className="profile-edit btn btn-sm btn-outline-secondary border-0 align-top"
      >
        Edit
      </a>
    )}
    <br />
    <br />
    <div>
      Send
      <br />
      <br />
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100100.01`}
        class="btn btn-primary"
      >
        100100.01 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100100.05`}
        class="btn btn-primary"
      >
        100100.05 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100100.1`}
        class="btn btn-primary"
      >
        100100.1 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100100.3`}
        class="btn btn-primary"
      >
        100100.3 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/111110.5`}
        class="btn btn-primary"
      >
        111110.5 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100000`}
        class="btn btn-primary"
      >
        100000 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/30000`}
        class="btn btn-primary"
      >
        30000 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/50000`}
        class="btn btn-primary"
      >
        50000 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100000`}
        class="btn btn-primary"
      >
        100000 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/20005`}
        class="btn btn-primary"
      >
        20005 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/5000`}
        class="btn btn-primary"
      >
        5000 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/10000`}
        class="btn btn-primary"
      >
        10000 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/0.1`}
        class="btn btn-primary"
      >
        0.1 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
      <a
        href={`https://send.near.watch/${context.accountId}/${accountId}/100`}
        class="btn btn-primary"
      >
        100 Ⓝ
      </a>
    </div>
  </div>
);
