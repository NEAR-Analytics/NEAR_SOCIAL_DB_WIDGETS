const Button = props.Components.Button;

const engine = props.engine();

return (
  <div>
    <h1>Events</h1>

    <Button
      onClick={() => {
        props.routing.push('new', {}, 'container', {
          title: 'Create new Event',
          back: true,
        });
      }}
    >
      Create new Event
    </Button>

    <Button
      onClick={() => {
        props.routing.push('index.list_container', {}, 'container', {
          title: 'My Events',
          back: true,
        });
      }}
    >
      My Events
    </Button>

    <br />

    {JSON.stringify(engine, null, 2)}
  </div>
);
