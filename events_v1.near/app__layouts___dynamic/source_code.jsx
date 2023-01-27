State.init({
  layout: null,
});

if (!state) {
  return '';
}

const layout = state.layout;

props.__.engine.setLayoutController((_layout) => {
  console.log('setLayout', _layout);
  State.update({
    layout: _layout,
  });
  console.log(1);
});

console.log(2);
const key = props.key;

// guard to allow 'default' layout exit infinite render loop
if (
  layout === 'default' ||
  layout === null ||
  layout === '' ||
  layout === undefined
) {
  console.log(3);
  return (
    <Widget
      src={props.__.engine.widgetFromName(props.component.name)}
      key={key}
      props={{ ...props.component.props, ...{ __: props.__ } }}
    />
  );
}

console.log(4);
return (
  <Widget
    src={props.__.layoutFromName(layout)}
    key={key}
    props={{
      ...(props.layoutProps || {}),
      ...{ __: props__ },
      component: {
        name: props.component.name,
        props: props.component.props,
        layout: props.component.innerLayout,
        layoutProps: props.component.innerLayoutProps,
      },
    }}
  />
);
