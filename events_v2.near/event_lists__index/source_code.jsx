props.controller.setLayout('layouts:container', {
  back: false,

  primaryAction: {
    label: 'Create new Eventlist',
    onClick: ['push', 'new', {}],
  },

  items: [
    {
      label: 'Lists',
      onClick: [{ appName: 'event_lists', method: 'replace' }, 'index', {}],
      active: true,
    },
    {
      label: 'Events',
      onClick: [{ appName: 'events', method: 'replace' }, 'index', {}],
    },
  ],
});

const Container = props.__engine.Components.Container;
const Spacer = props.__engine.Components.Spacer;

return (
  <>
    <Container>
      {props.__engine.renderComponent('index.container', {
        header: 'Your event lists',
        forAccountId: props.__engine.accountId,
      })}
    </Container>

    <Spacer />

    <Container>
      {props.__engine.renderComponent('index.container', {
        header: 'All event lists',
        search: true,
      })}
    </Container>
  </>
);
