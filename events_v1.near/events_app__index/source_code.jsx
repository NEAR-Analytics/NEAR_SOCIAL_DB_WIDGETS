const APP_OWNER = 'events_v1.near';
const APP_NAME = 'events_app';

const accountId = props.accountId;

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
        props.routing.push('index.list_container', {}, 'container', {
          title: 'My Events',
          back: true,
        });
      }}
    >
      My Events
    </Button>

    <br />

    <Widget
      src={`${APP_OWNER}/widget/${APP_NAME}__index__list_container`}
      props={{}}
    />
  </div>
);
