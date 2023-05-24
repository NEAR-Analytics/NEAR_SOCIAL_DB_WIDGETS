const { widgetType, hasBackground } = props;

if (widgetType !== 1 && widgetType !== 2 && widgetType !== 3) {
  return `widgetType prop is mandatory and it should be 1, 2 or 3`;
}

return (
  <div>
    {widgetType === 1 && (
      <Widget
        src="7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c/widget/ProgressWidgetTable"
        props={{ hasBackground: hasBackground }}
      />
    )}
    {widgetType === 2 && (
      <Widget
        src="7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c/widget/ProgressWidgetTable-V2"
        props={{ hasBackground: hasBackground }}
      />
    )}
    {widgetType === 3 && (
      <Widget
        src="7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c/widget/ProgressWidgetTable-V2"
        props={{ hasBackground: hasBackground }}
      />
    )}
  </div>
);
