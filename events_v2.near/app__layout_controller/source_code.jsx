if (state === undefined || state === null) {
  State.init({
    layout: null,
    layoutProps: null,
  });
  return null;
}

function setLayout(name, props) {
  if (
    state &&
    state.layout === name &&
    JSON.stringify(state.layoutProps) === JSON.stringify(props)
  ) {
    return;
  }

  State.update({
    layout: name,
    layoutProps: props,
  });
}

const layout = state.layout;
const layoutProps = state.layoutProps || {};

let layoutName = layout;
if (
  layout === '' ||
  layout === 'default' ||
  layout === 'layouts:default' ||
  layout === null ||
  layout === undefined
) {
  layoutName = 'layouts:default';
}

// get existing controller from component props or create a new one
const controller = props.component.props.controller || {
  setLayout,
};

const layProps = {
  ...layoutProps,
  __engine: props.__engine,
  controller,
  component: {
    name: props.component.name,
    props: { ...props.component.props, controller, __engine: props.__engine },
  },
};

const path = props.__engine.layoutPathFromName(layoutName);
return <Widget src={path} props={layProps} />;
