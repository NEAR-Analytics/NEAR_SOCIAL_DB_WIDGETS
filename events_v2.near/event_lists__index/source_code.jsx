props.controller.setLayout('layouts:container', {
  title: 'ND Event Lists',
  back: false,

  primaryAction: {
    label: 'Create new Eventlist',
    onClick: ['push', 'new', {}],
  },
});

const Button = props.__engine.Components.Button;
const Container = props.__engine.Components.Container;

return (
  <Container>
    {props.__engine.renderComponent('index.list_container', {})}
  </Container>
);
