const EVENTS_CONTRACT = 'events_v1.near';

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

const Loading = props.Components.Loading;
if (!events) {
  return <Loading>Loading events</Loading>;
}

return (
  <Widget
    src={`${APP_OWNER}/widget/${APP_NAME}__index__list`}
    props={{ events: events }}
  />
);
