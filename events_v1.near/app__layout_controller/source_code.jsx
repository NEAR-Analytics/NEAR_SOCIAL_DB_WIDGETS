if (state === undefined || state === null) {
  State.init({
    layout: null,
    layoutProps: null,
  });
  return null;
}

function setLayout(name, props) {
  // console.log('setLayout', name, props);
  if (
    state &&
    state.layout === name &&
    JSON.stringify(state.layoutProps) === JSON.stringify(props)
  ) {
    // console.log({ state });
    // console.log(state.layout === name);
    // console.log(JSON.stringify(state.layoutProps) === JSON.stringify(props));
    // console.log(JSON.stringify(state.layoutProps));
    // console.log('setLayout: no change');
    return;
  }
  // console.log('setLayout: updating', name, props);
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
  layout === null ||
  layout === undefined
) {
  layoutName = 'default';
}

// console.log(
//   props.component.name,
//   'Has controller',
//   props.component.props.controller ? true : false
// );
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

// console.log({ layProps });

const path = props.__engine.layoutPathFromName(layoutName);
return <Widget src={path} props={layProps} />;
