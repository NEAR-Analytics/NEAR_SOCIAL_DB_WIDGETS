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

// guard to allow 'default' layout exit infinite render loop
if (
  layout === 'default' ||
  layout === null ||
  layout === '' ||
  layout === undefined
) {
  return (
    <Widget src={props.__engine.widgetFromName(name)} props={widgetProps} />
  );
}

return (
  <Widget
    src={layoutFromName(layout)}
    key={key}
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
