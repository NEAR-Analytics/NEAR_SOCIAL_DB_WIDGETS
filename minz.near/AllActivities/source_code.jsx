const CONTRACT = "event_org.near";

let events = Near.view(CONTRACT, "get_all_events");

// return data;
if (!events) {
  return "Loading";
}
console.log(events);

const AllWidgets = styled.div`
display: flex;
flex-wrap: wrap;

& > * {
 margin: 6px;
}
`;

const allWidgets = events.map((event_id) => {
  console.log(event_id);
  return <Widget src={`minz.near/widget/ViewActivity`} props={{ event_id }} />;
});
return <AllWidgets>{allWidgets}</AllWidgets>;
