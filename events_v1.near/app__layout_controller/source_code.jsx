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
  return (
    <Widget
      src={props.__engine.widgetPathFromName(props.__component.name)}
      props={{
        __layout,
        __engine: props.__engine,
        ...props.__component.props,
      }}
    />
  );
}

console.log('render with layout', props.__component.name, layout);
console.log({layoutProps}, props.__component});
return (
  <Widget
    src={props.__engine.layoutPathFromName(layout)}
    props={{
      ...layoutProps,
      __engine: props.__engine,
      __component: {
        name: props.__component.name,
        props: { ...props.__component.props, __layout },
      },
    }}
  />
);
