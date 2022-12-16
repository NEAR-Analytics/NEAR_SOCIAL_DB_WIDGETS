const CONTRACT = "event_org.near";

let events = Near.view(CONTRACT, "get_all_events");

// return data;
if (!events) {
  return "Loading";
}
console.log(events);

const allWidgets = events.map((event_id) => {
  console.log(event_id);
  return <Widget src={`minz.near/widget/ViewActivity`} props={{ event_id }} />;
});

// return (
//   <Widget
//     src={`minz.near/widget/ViewActivity`}
//     props={{ event_id: "event_0" }}
//   />
// );
return <>{allWidgets}</>;
