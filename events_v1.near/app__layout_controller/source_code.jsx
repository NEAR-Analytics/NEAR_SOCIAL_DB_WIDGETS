props.__engine.registerLayoutController(props.__.ref, (o) => {
  console.log('LAYOUT CONTROLLER', props.__.ref, { o });
  State.update(o);
});

function renderControl() {
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
}

return renderControl();
