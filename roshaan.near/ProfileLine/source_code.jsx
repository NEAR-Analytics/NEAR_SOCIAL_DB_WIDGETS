//ProfileLine
const accountId = props.accountId ?? context.accountId;
const link = props.link ?? true;
const profileImageTooltipItems = props.profileImageTooltipItems ?? [];

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const tags = props.showTags && profile.tags && Object.keys(profile.tags);
const inner = (
  <>
    <div className="flex flex-row">
      <Widget
        src="roshaan.near/widget/ProfileImage"
        props={{
          style: { width: "3em", height: "3em" },
          profile,
          tooltip: true,
          tooltipItems: profileImageTooltipItems,
          accountId,
          className: "d-inline-block",
          imageClassName: "rounded w-100 h-100 align-top",
        }}
      />
      <div className="flex flex-col">
        <a
          href={
            link !== true
              ? link
              : `#/mob.near/widget/ProfilePage?accountId=${accountId}`
          }
          className="text-truncate"
        >
          <span>
            {profile.name || ""}
            <span className="text-muted pl-4">@{accountId}</span>
          </span>
        </a>

        {tags.length > 0 && (
          <div>
            {tags.map((tag, i) => (
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
