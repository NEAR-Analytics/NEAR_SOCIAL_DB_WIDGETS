State.init({
  layout: props.layout.name,
  layoutProps: props.layout.props,
});

if (!state) {
  return null;
}

function setLayout(name, props) {
  if (
    state &&
    state.layout === name &&
    JSON.stringify(state.layoutProps) === JSON.stringify(props)
  ) {
    // no setLayout
    console.log('NO CHANGE', name, props);
    return;
  }
  console.log('CHANGE');
  console.log('BEFORE', state);
  console.log('AFTER', {
    layout: name,
    layoutProps: props,
  });
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
  console.log('render raw component', props.component.name);
  return (
    <Widget
      src={props.__engine.widgetPathFromName(props.component.name)}
      props={{
        __layout,
        __engine: props.__engine,
        ...props.component.props,
      }}
    />
  );
}

console.log('render layout', layout);
return (
  <Widget
    src={props.__engine.layoutPathFromName(layout)}
    props={{
      ...layoutProps,
      __engine: props.__engine,
      __component: {
        name: props.component.name,
        props: { ...props.component.props, __layout },
      },
    }}
  />
);
