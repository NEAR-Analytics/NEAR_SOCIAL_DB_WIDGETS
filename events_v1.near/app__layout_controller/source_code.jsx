props.__engine.registerLayoutController(props.__ref, (o) => {
  console.log('LAYOUT CONTROLLER', props.__ref, { o });
  State.update(o);
});

State.init({
  layout: props.layout.name,
  layoutProps: props.layout.props,
});

if (!state) {
  return null;
}

const layout = state.layout;
const layoutProps = state.layoutProps;

// guard to allow layout exit infinite render loop
if (
  layout === '' ||
  layout === 'default' ||
  layout === null ||
  layout === undefined
) {
  return (
    <Widget
      src={props.__engine.widgetFromName(name)}
      props={{
        __engine: props.__engine,
        ...props.component.props,
      }}
    />
  );
}

return (
  <Widget
    src={props.__engine.layoutFromName(layout)}
    props={{
      ...{state.layoutProps || {}},

      __engine: props.__engine,
      component: {
        name: props.component.name,
        props: props.component.props,
      },
    }}
  />
);
