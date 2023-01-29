if (state === undefined || state === null) {
  State.init({
    layout: null,
    layoutProps: null,
  });
  return null;
}

function setLayout(name, props) {
  if (
    state &&
    state.layout === name &&
    JSON.stringify(state.layoutProps) === JSON.stringify(props)
  ) {
    return;
  }
  State.update({
    layout: name,
    layoutProps: props,
  });
}

const layout = state.layout;
const layoutProps = state.layoutProps || {};

const __layout = {
  setLayout: setLayout,
};

// guard to allow layout exit infinite render loop
if (
  layout === '' ||
  layout === 'default' ||
  layout === null ||
  layout === undefined
) {
  console.log('render without layout', props.__component.name);

  const widget = (
    <Widget
      src={props.__engine.widgetPathFromName(props.__component.name)}
      props={{
        ...props.__component.props,
        __engine: props.__engine,
        __layout,
      }}
    />
  );

  return widget;
}

console.log('1');
const widgetProps = {
  ...layoutProps,
  __engine: props.__engine,
  __component: {
    name: props.__component.name,
    props: { ...props.__component.props, __layout },
  },
};
const layoutedPath = props.__engine.layoutPathFromName(layout);

console.log('2', layoutedPath);
console.log({ widgetProps }, widgetProps.__component.props.__layout);

console.log('render with layout', props.__component.name, { layout });

const layoutedWidget = <Widget src={layoutedPath} props={widgetProps} />;
console.log('3');
return layoutedWidget;
