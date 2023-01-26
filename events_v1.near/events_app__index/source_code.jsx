const Button = props.Components.Button;

const engine = props.engine;

console.log('engine', engine);

if (!engine) {
  return 'loading';
}

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

    {engine.renderComponent('index.list_container', {})}
  </div>
);
