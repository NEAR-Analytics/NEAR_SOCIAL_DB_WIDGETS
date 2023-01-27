State.init({
  layout: null,
  layoutProps: null,
});

if (!state) {
  return '';
}

props.__.engine.setLayoutController((_layout, _layoutProps) => {
  State.update({
    layout: _layout,
    layoutProps: _layoutProps,
  });
});

const key = props.key;

// guard to allow 'default' layout exit infinite render loop
if (
  state.layout === 'default' ||
  state.layout === null ||
  state.layout === '' ||
  state.layout === undefined
) {
  return (
    <Widget
      src={props.__.engine.widgetFromName(props.component.name)}
      key={key}
      props={{ ...props.component.props, ...{ __: props.__ } }}
    />
  );
}

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
console.log('aaaaaaaaaa', nextSource, nextProps);

return <Widget src={nextSource} key={key} props={nextProps} />;
