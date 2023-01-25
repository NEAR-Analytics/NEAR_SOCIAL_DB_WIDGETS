const APP_OWNER = 'events_v1.near';
const APP_NAME = 'events_app';
const accountId = props.accountId ?? context.accountId;

const Button = props.rendering.Components.Button;

console.log('props', props);

return (
  <div>
    <h1>Events</h1>
    <a
      href={`#/${APP_OWNER}/widget/${APP_NAME}__new?accountId=${accountId}`}
      className="TODO"
    >
      <Button>Create new Event</Button>
    </a>

    <a
      href={`#/${APP_OWNER}/widget/${APP_NAME}__index__list_container?accountId=${accountId}`}
      className="TODO"
    >
      <Button>My events</Button>
    </a>

    <br />

    <Widget
      src={`${APP_OWNER}/widget/${APP_NAME}__index__list_container`}
      props={{}}
    />
  </div>
);
