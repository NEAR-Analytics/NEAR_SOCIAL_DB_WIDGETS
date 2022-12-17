const accountId = props.accountId;
const widgetName = props.widgetName;
const widgetPath = `${accountId}/widget/${widgetName}`;
const blockHeight = props.blockHeight;
const widget = Social.getr(widgetPath);

const code = widget[""];
const metadata = widget.metadata;

const name = metadata.name ?? widgetName;
const image = metadata.image;

const embedCode = `
\`\`\`jsx
<Widget
  src="${widgetPath}"
  props={{ }}
/>
\`\`\`
`;

const source = `
\`\`\`jsx
${code}
\`\`\`
`;

return (
  <div>
    <div className="d-flex justify-content-between mb-3">
      <div className="me-4 text-truncate">
        <Widget
          src="mob.near/widget/Component.InlineBlock"
          props={{ accountId, widgetName }}
        />
      </div>
      <div className="text-nowrap">
        <Widget
          src="mob.near/widget/PokeButton"
          props={{ accountId: profile.accountId }}
        />
      </div>
    </div>
    <div>
      <Markdown text={embedCode} />
      {/* <Markdown text={source} />*/}
    </div>
  </div>
);
