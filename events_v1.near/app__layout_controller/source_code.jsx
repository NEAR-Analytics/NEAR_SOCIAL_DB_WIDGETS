if (state === undefined || state === null) {
  State.init({
    layout: null,
    layoutProps: null,
  });
  return null;
}

if (!props.useLayout) {
  return (
    <Widget
      src={props.__engine.widgetPathFromName(props.component.name)}
      props={{
        ...props.component.props,
        __engine: props.__engine,
        __layout: {
          setLayout: () => {
            console.log('setLayout no-op');
            // no-op
          },
        },
      }}
    />
  );
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

const __layout = {
  setLayout: setLayout,
};

// // guard to allow layout exit infinite render loop
// if (
//   layout === '' ||
//   layout === 'default' ||
//   layout === null ||
//   layout === undefined
// ) {

//   const widget = (
//     <Widget
//       src={props.__engine.widgetPathFromName(props.component.name)}
//       props={{
//         ...props.component.props,
//         __engine: props.__engine,
//         __layout,
//       }}
//     />
//   );

//   return widget;
// }

const layProps = {
  ...layoutProps,
  __engine: props.__engine,
  component: {
    name: props.component.name,
    props: { ...props.component.props, __layout },
  },
};

let layoutName = layout;
if (
  layout === '' ||
  layout === 'default' ||
  layout === null ||
  layout === undefined
) {
  layoutName = 'default';
}

const path = props.__engine.layoutPathFromName(layoutName);
const layoutedWidget = <Widget src={path} props={layProps} />;
return layoutedWidget;
