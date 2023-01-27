State.init({
  layout: null,
  layoutProps: null,
});

if (!state) {
  return '';
}

console.log(1, state);
props.__.engine.setLayoutController((_layout, _layoutProps) => {
  console.log('setLayout', _layout);
  State.update({
    layout: _layout,
    layoutProps: _layoutProps,
  });
  console.log('setLayout 222222', _layout, _layoutProps);
});

console.log(2);
const key = props.key;

// guard to allow 'default' layout exit infinite render loop
if (
  state.layout === 'default' ||
  state.layout === null ||
  state.layout === '' ||
  state.layout === undefined
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
const nextSource = props.__.engine.layoutFromName(state.layout);
const nextProps = {
  ...(state.layoutProps || {}),
  ...{ __: props.__ },
  component: {
    name: props.component.name,
    props: props.component.props,
    layout: props.component.innerLayout,
    layoutProps: props.component.innerLayoutProps,
  },
};

return <Widget src={layoutSource} key={key} props={layoutProps} />;
