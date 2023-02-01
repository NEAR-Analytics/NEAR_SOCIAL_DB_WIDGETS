props.controller.setLayout('container', {
  title: 'ND Events',
  back: false,

  primaryAction: {
    label: 'Create new Event',
    onClick: ['push', 'new', {}],
  },
});

const Button = props.__engine.Components.Button;
const Container = props.__engine.Components.Container;
const PageTitle = props.__engine.Components.PageTitle;

return (
  <Container>
    Important: open in /embed/:
    <br />
    <a href="https://near.social/#/embed/events_v2.near/widget/events__app">
      Events Fullscreen:
      https://near.social/#/embed/events_v2.near/widget/events__app
    </a>
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
