const accountId = context.accountId;
const CONTRACT = "event_org.near";

let owned_events = Near.view(CONTRACT, "get_events_by_owner", {
  account_id: accountId,
});

let participated_events = Near.view(CONTRACT, "get_events_by_participants", {
  account_id: accountId,
});

// return data;
if (!owned_events || !participated_events) {
  return "Loading";
}

const ownedWidgets = owned_events.map((event_id) => {
  return <Widget src={`minz.near/widget/ViewActivity`} props={{ event_id }} />;
});

const participatedWidgets = participated_events.map((event_id) => {
  return <Widget src={`minz.near/widget/ViewActivity`} props={{ event_id }} />;
});
return (
  <>
    Events I started <br />
    <div>{ownedWidgets}</div>
    Events I joined <br />
    <div>{participatedWidgets}</div>
  </>
);
