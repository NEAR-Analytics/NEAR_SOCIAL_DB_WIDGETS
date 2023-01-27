State.init({
  layout: null,
});

if (!state) {
  return '';
}

const layout = state.layout;

const appOwner = props.componentProps.appOwner;

props.componentProps.setController = {
  setLayout: (layout) => {
    props.componentProps.layout = layout;
  },
};

// guard to allow 'default' layout exit infinite render loop
if (
  layout === 'default' ||
  layout === null ||
  layout === '' ||
  layout === undefined
) {
  return (
    <Widget
      src={props.__.engine.widgetFromName(name)}}
      key={key}
      props={widgetProps}
    />
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
