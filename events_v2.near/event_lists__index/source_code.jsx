props.controller.setLayout('layouts:container', {
  back: false,

  primaryAction: {
    label: 'Create new Eventlist',
    onClick: ['push', 'new', {}],
  },

  items: [
    {
      label: 'Lists',
      onClick: ['push', 'index', {}, { appName: 'event_lists' }],
      active: true,
    },
    {
      label: 'Events',
      onClick: ['push', 'index', {}, { appName: 'events' }],
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
