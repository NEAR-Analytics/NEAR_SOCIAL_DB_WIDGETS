const src = props.src ?? "mob.near/widget/WidgetSource";
const [accountId, widget, widgetName] = src.split("/");

const code = Social.get(src);

const text = `
\`\`\`jsx
${code}
\`\`\`
`;

return (
  <>
    <Widget
      src="mob.near/widget/WidgetMetadata"
      props={{ accountId, widgetName, expanded: true }}
    />
    <Markdown text={text} />
  </>
);
