const accountId = props.accountId;
const userId = context.accountId;

if (!accountId || !userId) {
  return "";
}

const myTags =
  Object.keys(Social.getr(`${userId}/profile/tags`, "final")) || [];
const profileVisitedTags =
  Object.keys(Social.getr(`${accountId}/profile/tags`, "final")) || [];
const tagsInCommon = myTags.filter(
  (a) => profileVisitedTags.length > 0 && profileVisitedTags.includes(a)
);

return (
  <div>
    {tagsInCommon.length > 0 && (
      <OverlayTrigger
        placement="auto"
        overlay={
          <Tooltip>
            <span> Tags in Common </span>
            {tagsInCommon.map((tag) => {
              return <li className={`list-group-item`}>{tag}</li>;
            })}
          </Tooltip>
        }
      >
        <span
          className="badge rounded-pill bg-primary"
          title={`${tagsInCommon.length} tags in common`}
        >
          {tagsInCommon.length} common tags
        </span>
      </OverlayTrigger>
    )}
  </div>
);
