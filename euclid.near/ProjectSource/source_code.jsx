const src = props.src ?? "euclid.near/widget/ProjectSource";
const [accountId, project, projectName] = src.split("/");

const code = Social.get(src);

const text = `
\`\`\`jsx
${code}
\`\`\`
`;

return (
  <>
    <Widget
      src="euclid.near/widget/ProjectMetadata"
      props={{ accountId, projectName, expanded: true }}
    />
    <Markdown text={text} />
  </>
);
