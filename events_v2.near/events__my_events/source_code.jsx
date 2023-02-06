props.controller.setLayout('layouts:container', {
  title: 'My events',
  back: true,

  primaryAction: {
    label: 'Create new Event',
    onClick: ['push', 'new', {}],
  },
});

const Container = props.__engine.Components.Container;

return (
  <Container>
    {props.__engine.renderComponent('index.list_container', {
      forAccountId: props.__engine.accountId,
    })}
  </Container>
);
