props.controller.setLayout('container', {
  title: 'ND Events',
  back: false,
});

const Button = props.__engine.Components.Button;

return (
  <div
    style={{
      padding: '40px 20px',
    }}
  >
    <Button
      onClick={() => {
        props.__engine.push('new', {}, 'modal', {
          title: 'Create new Event',
          back: true,
        });
      }}
    >
      Create new Event
    </Button>

    <Button
      onClick={() => {
        props.__engine.push('my_events');
      }}
    >
      My Events
    </Button>

    <br />

    {props.__engine.renderComponent('index.list_container', {})}
  </div>
);
