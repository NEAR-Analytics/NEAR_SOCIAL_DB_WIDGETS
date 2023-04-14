const APP_OWNER = 'events_v1.near';
const APP_NAME = 'events';

return (
  <Widget
    src={`${APP_OWNER}/widget/app__frame`}
    props={{
      ...props,
      appOwner: APP_OWNER,
      appName: APP_NAME,
      entryRoute: 'index',
      entryProps: {},
    }}
  />
);
