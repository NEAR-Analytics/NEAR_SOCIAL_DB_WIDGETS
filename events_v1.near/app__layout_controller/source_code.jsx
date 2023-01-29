console.log('3');

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
    // console.log('NO CHANGE', name, props);
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
  console.log('4');
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

console.log('5');
return (
  <Widget
    src={props.__engine.layoutPathFromName(layout)}
    props={{
      ...layoutProps,
      __engine: props.__engine,
      component: {
        name: props.component.name,
        props: {
          __layout,
          __engine: props.__engine,
          ...props.component.props,
        },
      },
    }}
  />
);
