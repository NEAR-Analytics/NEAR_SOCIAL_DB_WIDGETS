const EVENTS_CONTRACT = 'events_v2.near';
const EVENTS_LIMIT = 5;
const DESCRIPTION_MAX_LENGTH = 200;
const ANIMATION_DELAY = 300;

const include_events = props.include_events || false;

const event_list = props.event_list || null;
if (!event_list) {
  return props.__engine.helpers.propIsRequiredMessage('event_list');
}

return <>asdfjha s;dkf</>;
