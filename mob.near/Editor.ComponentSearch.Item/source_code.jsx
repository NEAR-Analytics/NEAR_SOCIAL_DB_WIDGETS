const accountId = props.accountId;
const widgetName = props.widgetName;
const widgetPath = `${accountId}/widget/${widgetName}`;
const blockHeight = props.blockHeight;
const widget = Social.getr(widgetPath);

const code = widget[""];
const metadata = widget.metadata;

const name = metadata.name ?? widgetName;
const image = metadata.image;

const embedCode = `<Widget src="${widgetPath}" props={{ }} />`;

// const embedMd = `
// \`\`\`jsx
// ${embedCode}
// \`\`\`
// `;

// const sourceMd = `
// \`\`\`jsx
// ${code}
// \`\`\`
// `;

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
        <OverlayTrigger
          placement="auto"
          overlay={<Tooltip>Copy embedding code to clipboard</Tooltip>}
        >
          <button
            className="btn btn-outline-primary"
            onClick={() => {
              clipboard.writeText(embedCode).then(() => {
                State.update({ embedCopied: true });
              });
            }}
          >
            {state.embedCopied ? (
              <i className="bi bi-check-lg me-1" />
            ) : (
              <i className="bi bi-clipboard me-1" />
            )}
            Embed
          </button>
        </OverlayTrigger>
      </div>
    </div>
  </div>
);
