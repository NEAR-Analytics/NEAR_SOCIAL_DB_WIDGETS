//ProfileLine
const accountId = props.accountId ?? context.accountId;
const link = props.link ?? true;
const profileImageTooltipItems = props.profileImageTooltipItems ?? [];
const showFollowerStats = props.showFollowerStats ?? false;
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const tags = props.showTags && profile.tags && Object.keys(profile.tags);
const showFollowButton = props.showFollowButton ?? false;

const inner = (
  <>
    <div style={{ display: "flex" }}>
      <div>
        <Widget
          src="roshaan.near/widget/ProfileImage"
          props={{
            style: { display: "flex", width: "4em", height: "auto" },
            profile,
            tooltip: true,
            tooltipItems: profileImageTooltipItems,
            accountId,
            className: "d-inline-block",
            imageClassName: "rounded w-100 h-100 align-top",
          }}
        />
      </div>
      <div style={{ "padding-left": "5px" }}>
        <a
          href={
            link !== true
              ? link
              : `#/mob.near/widget/ProfilePage?accountId=${accountId}`
          }
          className="text-truncate"
          target="_blank"
        >
          <span>
            {profile.name || ""}
            <span className="text-muted">@{accountId}</span>
            {showFollowButton && (
              <Widget
                src="mob.near/widget/FollowButton"
                props={{ accountId }}
              />
            )}
          </span>
        </a>
        {showFollowerStats && (
          <Widget src="roshaan.near/widget/FollowStats" props={{ accountId }} />
        )}

        {tags.length > 0 && (
          <div>
            {tags.slice(0, 5).map((tag, i) => (
              <span key={i} className="me-1 mb-1 badge bg-secondary">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  </>
);

return <span className="text-truncate">{inner}</span>;
