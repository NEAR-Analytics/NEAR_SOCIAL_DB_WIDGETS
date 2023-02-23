const widgetPath = props.widgetPath;
const onChange = props.onChange;

let metadata = Social.getr(`${widgetPath}/metadata`);
if (metadata === null) {
  return "Loading";
}
if (metadata !== undefined) {
  metadata["tags"] = { ethdenver: "" };
}
if (metadata === undefined) {
  metadata = {};
  metadata["tags"] = { ethdenver: "" };
}

return (
  <Widget
    key={widgetPath}
    src="whtt.near/widget/MetadataEditor"
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
          placeholder: "defi, nft",
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
