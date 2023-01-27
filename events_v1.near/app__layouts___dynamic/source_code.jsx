State.init({
  layout: null,
});

if (!state) {
  return '';
}

props.componentProps.setController = {
  setLayout: (layout) => {
    props.componentProps.layout = layout;
  },
};

// guard to allow 'default' layout exit infinite render loop
if (
  layout === 'default' ||
  layout === null ||
  layout === '' ||
  layout === undefined
) {
  return (
    <Widget
      src={`${appOwner}/widget/${appName}__${slugFromName(name)}`}
      key={key}
      props={widgetProps}
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
