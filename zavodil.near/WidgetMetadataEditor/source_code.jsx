const widgetPath = props.widgetPath;
const onChange = props.onChange;
const forcedTag = props.forcedTag;

let metadata = Social.getr(`${widgetPath}/metadata`) ?? {};

if (metadata === null) {
  return "Loading";
}

if (forcedTag) {
  const tags = Object.keys(metadata.tags ?? {});
  if (tags.length) {
    if (tags.includes(forcedTag)) {
      metadata.tags[[forcedTag]] = "";
    }
  } else metadata.tags = { [forcedTag]: "" };
}

return (
  <Widget
    key={widgetPath}
    src="mob.near/widget/MetadataEditor"
    props={{
      initialMetadata: metadata,
      onChange,
      options: {
        name: { label: "Title" },
        image: { label: "Icon" },
        description: { label: "Description" },
        tags: {
          label: "Tags",
          pattern: "*/widget/*/metadata/tags/*",
          placeholder: "profile, editor, social, finance, app, image, nft",
        },
        linktree: {
          links: [
            {
              label: "Website",
              prefix: "https://",
              name: "website",
            },
          ],
        },
      },
    }}
  />
);
