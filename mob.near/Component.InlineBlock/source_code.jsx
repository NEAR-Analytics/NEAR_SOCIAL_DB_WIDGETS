const accountId = props.accountId;
const widgetName = props.widgetName;
const widgetPath = `${accountId}/widget/${widgetName}`;
const blockHeight = props.blockHeight;
const metadata = props.metadata ?? Social.getr(`${widgetPath}/metadata`);

const name = metadata.name ?? widgetName;
const description = metadata.description;

return (
  <div className="d-flex flex-row">
    <Widget
      src="mob.near/widget/WidgetImage"
      props={{
        metadata,
        accountId,
        widgetName,
        className: "me-2 flex-shrink-1",
      }}
    />
    <div>
      <div className="text-truncate">
        <span className="fw-bold">{name}</span>{" "}
        <small>
          <span className="font-monospace">{widgetPath}</span>
        </small>
      </div>
      <div className="text-truncate text-muted">{description}</div>
    </div>
  </div>
);
