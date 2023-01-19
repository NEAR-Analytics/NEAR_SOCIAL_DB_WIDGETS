const CONTRACT = "events_v1.near";
const CONTRACT_OWNER = "solleder.near";

// accountID is used to determine for whom the events are displayed
// if no accountID is provided, all events are displayed
const accountId = props.accountId;

let events =
  accountId === undefined
    ? Near.view(CONTRACT, "get_all_events")
    : Near.view(CONTRACT, "get_all_events_by_account", {
        account_id: accountId,
      });

if (!events) {
  return "Loading";
}
console.log(events);

return <Widget src={`${CONTRACT_OWNER}/widgets/index__list`} events={events} />;
