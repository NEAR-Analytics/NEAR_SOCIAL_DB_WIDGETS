const Button = props.Components.Button;

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
        props.routing.push(
          'index.list_container',
          {
            forAccountId: props.accountId,
          },
          'container',
          {
            title: 'My Events',
            back: true,
          }
        );
      }}
    >
      My Events
    </Button>

    <br />

    {props.engine.renderComponent('index.list_container', {})}
  </div>
);
