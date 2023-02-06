props.controller.setLayout('layouts:container', {
  title: 'ND Event Lists',
  back: false,

  primaryAction: {
    label: 'Create new Eventlist',
    onClick: ['push', 'new', {}],
  },
});

const Container = props.__engine.Components.Container;

return (
  <Container>
    {props.__engine.renderComponent('index.list_container', {
      header: 'Your event lists',
      forAccountId: props.__engine.accountId,
    })}
  </Container>
);
