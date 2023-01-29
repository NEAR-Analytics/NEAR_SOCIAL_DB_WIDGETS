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
  layout === 'default' ||
  layout === '' ||
  layout === null ||
  layout === undefined
) {
  return (
    <Widget src={props.__engine.widgetFromName(name)} props={widgetProps} />
  );
}

return (
  <Widget
    src={props.__engine.layoutFromName(layout)}
    props={{
      ...componentProps,
      ...(layoutProps || {}),
      component: {
        name: name,
        props: props,
        layout: innerLayout,
        layoutProps: innerLayoutProps,
      },
    }}
  />
);
