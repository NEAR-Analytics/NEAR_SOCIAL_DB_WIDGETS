const bosNftBuildersContractAccountId =
  props.bosNftBuildersContractAccountId || context.widgetSrc.split("/", 1)[0];

const bosNftBuildersWidgetsAccountId =
  props.bosNftBuildersWidgetsAccountId || context.widgetSrc.split("/", 1)[0];

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    bosNftBuildersContractAccountId: props.bosNftBuildersContractAccountId,
    bosNftBuildersWidgetsAccountId: props.bosNftBuildersWidgetsAccountId,
  };
  return (
    <Widget
      src={`${bosNftBuildersWidgetsAccountId}/widget/bNFTb.${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

return <>Hello World</>;
