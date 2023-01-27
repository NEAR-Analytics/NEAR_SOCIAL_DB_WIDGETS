State.init({
  layout: null,
});

if (!state) {
  return '';
}

console.log({ props });

const layout = state.layout;

props.componentProps.setController = {
  setLayout: (_layout) => {
    props.componentProps.__.setLayout = _layout;
    State.update({
      layout: _layout,
    });
  },
};

const key = props.key;

// guard to allow 'default' layout exit infinite render loop
if (
  layout === 'default' ||
  layout === null ||
  layout === '' ||
  layout === undefined
) {
  return (
    <Widget
      src={props.__.engine.widgetFromName(props.component.name)}
      key={key}
      props={props.component.props}
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
