const APP_OWNER = 'events_v2.near';
const APP_NAME = 'event_lists';
const DEBUG = 'true';

console.log('skjdfhasdf');
return (
  <Widget
    src={`${APP_OWNER}/widget/app__frame`}
    props={{
      ...props,
      appOwner: APP_OWNER,
      appName: APP_NAME,
      entryRoute: 'index',
      entryProps: {},
      DEBUG: DEBUG.match(/true|1|yes/iu),
    }}
  />
);
