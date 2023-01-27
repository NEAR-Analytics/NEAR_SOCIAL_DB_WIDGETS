State.init({
  layout: null,
});

if (!state) {
  return '';
}

console.log({ props });

console.log(1);
const layout = state.layout;

console.log(2);
props.__.engine.setLayoutController((_layout) => {
  console.log('setLayout', _layout);
  // props.__.setLayout = _layout;
  State.update({
    layout: _layout,
  });
});

console.log(3);
const key = props.key;

console.log(4);
// guard to allow 'default' layout exit infinite render loop
if (
  layout === 'default' ||
  layout === null ||
  layout === '' ||
  layout === undefined
) {
  console.log(5);
  console.log('rendering component', props.component.name);
  return (
    <Widget
      src={props.__.engine.widgetFromName(props.component.name)}
      key={key}
      props={{ props.__, ...props.component.props }}
    />
  );
}

console.log(6);
return null;
// return (
//   <Widget
//     src={props.__.layoutFromName(layout)}
//     key={key}
//     props={{
//       ...props,
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
