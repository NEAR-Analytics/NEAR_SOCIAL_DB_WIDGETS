const APP_OWNER = 'events_v1.near';
const APP_NAME = 'events_app';

return (
  <Widget
    src={`embed/${APP_OWNER}/widget/app__frame`}
    props={{ ...props, appOwner: APP_OWNER }}
  />
);
