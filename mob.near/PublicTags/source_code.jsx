// ContractPage
const ownerId = "mob.near";
const appName = "nametag";
const accountId = props.accountId ?? context.accountId;
const extraTags = props.extraTags ?? {};

const tagsPattern = `*/${appName}/${accountId}/tags/*`;
const tagsObject = Social.keys(tagsPattern, "final");

const tagClass = "bg-success";
const addPublicTagHtml = (
  <div class={`me-1 badge bg-primary`}>
    <a
      href={`#/mob.near/widget/AllLabels?accountId=${accountId}`}
      class="text-white"
    >
      + Add Name Tag
    </a>
  </div>
);

if (tagsObject === null) {
  return "Loading";
}

const tagsCount = {};

const processTagsObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (kv[1] === null) {
      const tag = kv[0];
      tagsCount[tag] = (tagsCount[tag] || 0) - 1;
    } else if (typeof kv[1] === "object") {
      processTagsObject(kv[1]);
    } else {
      const tag = kv[0];
      tagsCount[tag] = (tagsCount[tag] || 0) + 1;
    }
  });
};

const getTags = () => {
  processTagsObject(extraTags);
  processTagsObject(tagsObject);
  const tags = Object.entries(tagsCount);
  tags.sort((a, b) => b[1] - a[1]);
  return tags.map((t) => {
    return {
      name: t[0],
      count: t[1],
      title: t[1] + (t[1] > 1 ? " votes" : " vote"),
    };
  });
};

const publicTags = getTags();
return (
  <>
    {publicTags &&
      publicTags.map((tag) => (
        <span
          className={`badge ${tagClass} position-relative`}
          title={tag.title}
          style={
            tag.count > 1
              ? {
                  marginRight: "0.9em",
                  paddingRight: "0.85em",
                }
              : { marginRight: "0.25em" }
          }
        >
          #{tag.name}
          {tag.count > 1 && (
            <span
              className={`badge translate-middle rounded-pill bg-danger position-absolute top-50 start-100`}
            >
              {tag.count}
            </span>
          )}
        </span>
      ))}
    {addPublicTagHtml}
  </>
);
