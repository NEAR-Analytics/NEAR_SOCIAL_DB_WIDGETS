State.init({
  layout: props.layout.name,
  layoutProps: props.layout.props,
});

if (!state) {
  return null;
}

function changeLayout(name, props) {
  if (
    state &&
    state.layout === name &&
    JSON.stringify(state.layoutProps) === JSON.stringify(props)
  ) {
    // no change
    console.log('NO CHANGE', name, props);
    return;
  }
  console.log('CHANGE', name, props);
  State.update({
    layout: name,
    layoutProps: props,
  });
}

const layout = state.layout;
const layoutProps = state.layoutProps || {};

const __layout = {
  change: changeLayout,
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
      __controller: { ...(props.__controller || {}), __layout },
      component: {
        name: props.component.name,
        props: props.component.props,
      },
    }}
  />
);
