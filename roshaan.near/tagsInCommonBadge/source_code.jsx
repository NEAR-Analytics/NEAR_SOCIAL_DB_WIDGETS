const accountId = props.accountId;
const userId = context.accountId;

if (!accountId || !userId) return;

const myTagsKeys = Social.getr(`${userId}/profile/tags`, "final");
const profileVisitedTagsKeys = Social.getr(
  `${accountId}/profile/tags`,
  "final"
);

const myTags = myTagsKeys ? Object.keys(myTagsKeys) : [];
const profileVisitedTags = profileVisitedTagsKeys
  ? Object.keys(profileVisitedTagsKeys)
  : [];

const tagsInCommon = myTags.filter((a) => profileVisitedTags.includes(a)) || [];

if (tagsInCommon.length == 0) return;

return (
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
);
