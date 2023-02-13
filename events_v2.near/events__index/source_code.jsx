props.controller.setLayout('layouts:container', {
  back: false,

  primaryAction: {
    label: 'Create new Event',
    onClick: ['push', 'new', {}],
  },

  items: [
    {
      label: 'Lists',
      onClick: [{ appName: 'event_lists', method: 'replace' }, 'index', {}],
    },
    {
      label: 'Events',
      onClick: [{ appName: 'events', method: 'replace' }, 'index', {}],
      active: true,
    },
  ],
});

const TextButton = props.__engine.Components.TextButton;
const Container = props.__engine.Components.Container;

return (
  <Container>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <TextButton
        onClick={() => {
          return props.__engine.push('my_events', {});
        }}
        style={{
          marginLeft: 'auto',
        }}
      >
        View my events
      </TextButton>
    </div>

    <br />

    {props.__engine.renderComponent('index.list_container', {})}
  </Container>
);
