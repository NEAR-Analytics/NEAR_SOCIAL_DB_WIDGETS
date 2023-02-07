const EVENTS_CONTRACT = 'events_v2.near';

// accountID is used to determine for whom the events are displayed
// if no accountID is provided, all events are displayed
const forAccountId = props.forAccountId;

let events = [];
if (forAccountId === undefined) {
  events = props.__engine.contract.view(EVENTS_CONTRACT, 'get_all_events');
} else {
  events = props.__engine.contract.view(
    EVENTS_CONTRACT,
    'get_all_events_by_account',
    {
      account_id: forAccountId,
    }
  );
}

if (!events) {
  return props.__engine.loading('loading events');
}

return props.__engine.renderComponent('index.list', { events });
