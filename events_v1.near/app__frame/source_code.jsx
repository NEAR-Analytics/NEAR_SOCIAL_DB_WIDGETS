const APP_OWNER = 'events_v1.near';
const APP_NAME = 'events_app';
const EVENTS_CONTRACT = 'events_v1.near';

const env = {
  APP_OWNER,
  APP_NAME,
  EVENTS_CONTRACT,
};

return <>{JSON.stringify(env, null, 4)}</>;
