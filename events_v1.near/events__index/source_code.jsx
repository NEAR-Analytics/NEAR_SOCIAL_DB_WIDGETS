const Button = props.__.Components.Button;
const PageTitle = props.__.Components.PageTitle;

return (
  <div>
    <PageTitle>Events</PageTitle>

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
        props.__engine.push(
          'index.list_container',
          {
            forAccountId: props.__.accountId,
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

    {props.__engine.renderComponent('index.list_container', {})}
  </div>
);
