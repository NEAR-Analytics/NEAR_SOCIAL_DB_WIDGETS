State.init({
  layout: null,
});

if (!state) {
  return '';
}

const layout = state.layout;

props.__.engine.setLayoutController((_layout) => {
  // props.__.setLayout = _layout;
  State.update({
    layout: _layout,
  });
});

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
      props={{ ...props.component.props, ...{ __: props.__ } }}
    />
  );
}

return (
  <Widget
    src={props.__.layoutFromName(layout)}
    key={key}
    props={{
      ...(props.layoutProps || {}),
      ...props,
      component: {
        name: props.component.name,
        props: props.component.props,
        layout: props.component.innerLayout,
        layoutProps: props.component.innerLayoutProps,
      },
    }}
  />
);
