const { widgetType, hasBackground } = props;
let defaultType = 1;

if (widgetType !== 1 && widgetType !== 2 && widgetType !== 3) {
  defaultType = 1;
} else {
  defaultType = widgetType;
}

return (
  <div>
    {defaultType === 1 && (
      <Widget
        src="7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c/widget/ProgressWidgetTable"
        props={{ hasBackground: hasBackground }}
      />
    )}
    {defaultType === 2 && (
      <Widget
        src="7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c/widget/ProgressWidgetTable-V2"
        props={{ hasBackground: hasBackground }}
      />
    )}
    {defaultType === 3 && (
      <Widget
        src="7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c/widget/ProgressWidgetTable-V3"
        props={{ hasBackground: hasBackground }}
      />
    )}
  </div>
);
