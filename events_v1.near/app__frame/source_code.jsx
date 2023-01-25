const APP_OWNER = '{{ env.APP_OWNER }}';
const APP_NAME = '{{ env.APP_NAME }}';
const EVENTS_CONTRACT = '{{ env.EVENTS_CONTRACT }}';

const env = {
  APP_OWNER,
  APP_NAME,
  EVENTS_CONTRACT,
};

return <>{JSON.stringify(env, null, 4)}</>;
