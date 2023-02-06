props.controller.setLayout('layouts:container', {
  title: 'ND Events',
  back: false,

  primaryAction: {
    label: 'Create new Event',
    onClick: ['push', 'new', {}],
  },
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
