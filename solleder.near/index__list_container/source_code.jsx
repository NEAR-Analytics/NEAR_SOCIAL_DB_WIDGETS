const CONTRACT = "events_v1.near";
const CONTRACT_OWNER = "solleder.near";

// accountID is used to determine for whom the events are displayed
// if no accountID is provided, all events are displayed
const accountId = props.accountId;

let events = [];
if (accountId === undefined) {
  events = Near.view(CONTRACT, "get_all_events");
} else {
  events = Near.view(CONTRACT, "get_all_events_by_account", {
    account_id: accountId,
  });
}

if (!events) {
  return "Loading!";
}

return (
  <Widget
    src={`${CONTRACT_OWNER}/widget/index__list`}
    props={{ events: events }}
  />
);
