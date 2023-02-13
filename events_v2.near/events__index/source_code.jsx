props.controller.setLayout('layouts:container', {
  back: false,

  primaryAction: {
    label: 'Create new Event',
    onClick: ['push', 'new', {}],
  },

  items: [
    {
      label: 'Lists',
      onClick: [{ appName: 'event_lists', method: 'push' }, 'index', {}],
    },
    {
      label: 'Events',
      onClick: [{ appName: 'events', method: 'push' }, 'index', {}],
      active: true,
    },
  ],
});

const Button = props.__engine.Components.Button;
const Container = props.__engine.Components.Container;

return (
  <Container>
    <Button
      onClick={() => {
        return props.__engine.push('my_events', {});
      }}
    >
      My Events
    </Button>

    <br />

    {props.__engine.renderComponent('index.list_container', {})}
  </Container>
);
