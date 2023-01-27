State.init({
  layout: null,
});

if (!state) {
  return '';
}

console.log({ props });

const layout = state.layout;

props.wrapperProps.__.engine.setLayoutController((_layout) => {
  console.log('setLayout', _layout);
  // props.wrapperProps.__.setLayout = _layout;
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
      props={{ ...props.wrapperProps, ...props.component.props }}
    />
  );
}

// return (
//   <Widget
//     src={props.wrapperProps.__.layoutFromName(layout)}
//     key={key}
//     props={{
//       ...props.wrapperProps,
//       ...(props.layoutProps || {}),
//       component: {
//         name: props.component.name,
//         props: props.component.props,
//         layout: props.component.innerLayout,
//         layoutProps: props.component.innerLayoutProps,
//       },
//     }}
//   />
// );
