const EVENTS_CONTRACT = 'events_v1.near';
const APP_OWNER = 'events_v1.near';
const APP_NAME = 'events_app';

// accountID is used to determine for whom the events are displayed
// if no accountID is provided, all events are displayed
const accountId = props.forAccountId;

let events = [];
if (accountId === undefined) {
  events = Near.view(EVENTS_CONTRACT, 'get_all_events');
} else {
  events = Near.view(EVENTS_CONTRACT, 'get_all_events_by_account', {
    account_id: accountId,
  });
}

if (!events) {
  return 'Loading';
}

return (
  <Widget
    src={`${APP_OWNER}/widget/${APP_NAME}__index__list`}
    props={{ events: events }}
  />
);
